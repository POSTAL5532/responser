package space.reviewly.authserver.config;

import java.time.Duration;
import org.springframework.security.config.Customizer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.server.authorization.client.InMemoryRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.web.SecurityFilterChain;

import java.util.*;
import space.reviewly.authserver.controller.CommonController;

/**
 * Authorization server configuration.
 *
 * @author Shcherbachenya Igor
 */
@RequiredArgsConstructor
@Configuration
public class AuthorizationServerConfiguration {

    private final ApplicationProperties properties;

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public SecurityFilterChain authorizationSecurityFilterChain(HttpSecurity http) throws Exception {
        OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);

        http
            .exceptionHandling(
                exceptions -> exceptions.authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint(CommonController.LOGIN_URL))
            )
            .getConfigurer(OAuth2AuthorizationServerConfigurer.class)
            .oidc(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public RegisteredClientRepository registeredClientRepository() {
        List<RegisteredClient> clients = new ArrayList<>();

        properties.getClientCredentials().forEach(cc -> {
            RegisteredClient webClient = RegisteredClient.withId(UUID.randomUUID().toString())
                .clientId(cc.getClientId())
                .clientSecret(cc.getClientSecret())
                .redirectUri(cc.getRedirectUri())
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                .tokenSettings(TokenSettings.builder()
                    .accessTokenTimeToLive(Duration.ofMinutes(cc.getAccessTokenTimeLifeMinutes()))
                    .refreshTokenTimeToLive(Duration.ofHours(cc.getRefreshTokenTimeLifeHours()))
                    .authorizationCodeTimeToLive(Duration.ofMinutes(20))
                    .reuseRefreshTokens(true)
                    .build())
                .build();

            clients.add(webClient);
        });

        return new InMemoryRegisteredClientRepository(clients.toArray(new RegisteredClient[0]));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
