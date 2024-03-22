package space.reviewly.authserver.config;

import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.InMemoryOAuth2AuthorizationService;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationService;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenGenerator;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import space.reviewly.authserver.controller.CommonController;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.authorization.client.InMemoryRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.security.web.SecurityFilterChain;

import java.time.Duration;
import java.util.*;
import space.reviewly.authserver.security.grantPassword.AuthorizationGrantTypePassword;
import space.reviewly.authserver.security.grantPassword.GrantPasswordAuthenticationProvider;
import space.reviewly.authserver.security.grantPassword.OAuth2GrantPasswordAuthenticationConverter;

/**
 * Authorization server configuration.
 *
 * @author Shcherbachenya Igor
 */
@RequiredArgsConstructor
@Configuration
public class AuthorizationServerConfiguration {

    private final CORSCustomizer corsCustomizer;

    private final ApplicationProperties properties;

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public SecurityFilterChain authServerSecurityFilterChain(
        HttpSecurity http,
        GrantPasswordAuthenticationProvider grantPasswordAuthenticationProvider,
        DaoAuthenticationProvider daoAuthenticationProvider
    ) throws Exception {

        OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);

        http
            .getConfigurer(OAuth2AuthorizationServerConfigurer.class)
            .tokenEndpoint(tokenEndpoint ->
                tokenEndpoint
                    .accessTokenRequestConverter(new OAuth2GrantPasswordAuthenticationConverter())
                    .authenticationProvider(grantPasswordAuthenticationProvider)
                    .authenticationProvider(daoAuthenticationProvider)
            );

        return http.build();

        /*OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);
        corsCustomizer.corsCustomizer(http);

        return http
            .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
            .csrf().disable()
            .formLogin().loginPage(CommonController.LOGIN_URL).failureUrl(CommonController.LOGIN_URL + "?error=true")
            .and().logout().logoutUrl(CommonController.LOGOUT_URL).invalidateHttpSession(true).deleteCookies("JSESSIONID").logoutSuccessUrl(properties.getSelfHost())
            .and().getConfigurer(OAuth2AuthorizationServerConfigurer.class).oidc(Customizer.withDefaults())
            .and().build();*/
    }

    @Bean
    public RegisteredClientRepository registeredClientRepository() {
        List<RegisteredClient> clients = new ArrayList<>();

        properties.getClientCredentials().forEach(cc -> {
            RegisteredClient webClient = RegisteredClient.withId(UUID.randomUUID().toString())
                .clientId(cc.getClientId())
                .clientSecret(cc.getClientSecret())
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                .authorizationGrantType(AuthorizationGrantTypePassword.GRANT_PASSWORD)
                //.authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
                //.scope(OidcScopes.OPENID)
                .redirectUri(cc.getRedirectUri())
                /*.tokenSettings(TokenSettings.builder()
                    // TODO: access_token expires like refresh_token instead access_token_lifetime
                    // TODO: use properties for lifetime configuration
                    .accessTokenTimeToLive(Duration.ofHours(12))
                    .refreshTokenTimeToLive(Duration.ofHours(12))
                    .build())*/
                .build();
            clients.add(webClient);
        });

        return new InMemoryRegisteredClientRepository(clients.toArray(new RegisteredClient[0]));
    }

    @Bean
    public GrantPasswordAuthenticationProvider grantPasswordAuthenticationProvider(
        UserDetailsService userDetailsService, OAuth2TokenGenerator<?> jwtTokenCustomizer,
        OAuth2AuthorizationService authorizationService, PasswordEncoder passwordEncoder
    ) {
        return new GrantPasswordAuthenticationProvider(
            authorizationService, jwtTokenCustomizer, userDetailsService, passwordEncoder
        );
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(
        PasswordEncoder passwordEncoder, UserDetailsService userDetailsService
    ) {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
        return daoAuthenticationProvider;
    }

    @Bean
    public OAuth2AuthorizationService authorizationService() {
        return new InMemoryOAuth2AuthorizationService();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    /*@Bean
    public AuthorizationServerSettings authorizationServerSettings() {
        return AuthorizationServerSettings.builder().build();
    }*/

    /*@Bean
    public JwtDecoder jwtDecoder(JWKSource<SecurityContext> jwkSource) {
        return OAuth2AuthorizationServerConfiguration.jwtDecoder(jwkSource);
    }*/
}
