package space.reviewly.authserver.config;

import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import space.reviewly.authserver.controller.CommonController;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;
import space.reviewly.authserver.security.socialLogin.SocialLoginAuthenticationSuccessHandler;
import space.reviewly.authserver.security.socialLogin.UserServiceOAuth2UserHandler;

/**
 * Auth server web security configuration. Install login form.
 *
 * @author Shcherbachenya Igor
 */
@RequiredArgsConstructor
@EnableWebSecurity
@Configuration(proxyBeanMethods = false)
public class SecurityConfiguration {

    private final ApplicationProperties properties;

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http, AuthenticationSuccessHandler authenticationSuccessHandler) throws Exception {

        return http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(authorize ->
                authorize
                    .requestMatchers("/images/**", "/js/**", "/css/**", "/font/**").permitAll()
                    .anyRequest().authenticated()
            )
            .formLogin(formLogin ->
                formLogin
                    .loginPage(CommonController.LOGIN_URL)
                    .failureUrl(CommonController.LOGIN_URL + "?error=true")
                    .permitAll()
            )
            .logout(logout ->
                logout
                    .logoutUrl(CommonController.LOGOUT_URL)
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID")
                    .logoutSuccessUrl(properties.getSelfHost())
                    .permitAll()
            )
            .oauth2Login(oauth -> oauth.successHandler(authenticationSuccessHandler))
            .build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers(
            "/images/**",
            "/js/**",
            "/css/**",
            "/font/**"
        );
    }

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler(UserServiceOAuth2UserHandler handler) {
        SocialLoginAuthenticationSuccessHandler authenticationSuccessHandler = new SocialLoginAuthenticationSuccessHandler();
        authenticationSuccessHandler.setOidcUserHandler(handler);

        return authenticationSuccessHandler;
    }

}
