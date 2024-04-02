package space.reviewly.authserver.config;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import space.reviewly.authserver.controller.CommonController;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    private final CORSCustomizer corsCustomizer;

    private final ApplicationProperties properties;

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http, AuthenticationSuccessHandler authenticationSuccessHandler) throws Exception {
        //corsCustomizer.corsCustomizer(http);

        return http
            .authorizeHttpRequests(authorize -> authorize.anyRequest().authenticated())
            .formLogin(withDefaults())
            .oauth2Login(oauth -> oauth.successHandler(authenticationSuccessHandler))
            .logout(LogoutConfigurer::permitAll)
            .build();

        /*return http
            .csrf().disable()
            .formLogin()
            .loginPage(CommonController.LOGIN_URL).failureUrl(CommonController.LOGIN_URL + "?error=true")
            .and().logout().logoutUrl(CommonController.LOGOUT_URL).invalidateHttpSession(true).deleteCookies("JSESSIONID").logoutSuccessUrl(properties.getSelfHost())
            .and().authorizeHttpRequests()
            .requestMatchers("/", CommonController.LOGIN_URL, CommonController.LOGOUT_URL).permitAll()
            .anyRequest().authenticated()
            .and().build();*/
    }

    /*@Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers(
            "/images/**",
            "/js/**",
            "/css/**",
            "/font/**"
        );
    }*/

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler(UserServiceOAuth2UserHandler handler) {
        SocialLoginAuthenticationSuccessHandler authenticationSuccessHandler = new SocialLoginAuthenticationSuccessHandler();
        authenticationSuccessHandler.setOidcUserHandler(handler);

        return authenticationSuccessHandler;
    }

}
