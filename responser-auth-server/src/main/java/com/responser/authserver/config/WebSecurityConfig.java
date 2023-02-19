package com.responser.authserver.config;

import com.responser.authserver.controller.CommonController;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Auth server web security configuration. Install login form.
 *
 * @author Shcherbachenya Igor
 */
@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class WebSecurityConfig {

    private final CORSCustomizer corsCustomizer;

    private final AuthServerApplicationProperties properties;

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        corsCustomizer.corsCustomizer(http);

        return http
            .csrf().disable()
            .formLogin()
            .loginPage(CommonController.LOGIN_URL).failureUrl(CommonController.LOGIN_URL + "?error=true")
            .and().logout().logoutUrl(CommonController.LOGOUT_URL).logoutSuccessUrl(properties.getAfterLogoutUrl())
            .and().authorizeHttpRequests()
            .requestMatchers("/", CommonController.LOGIN_URL, CommonController.LOGOUT_URL).permitAll()
            .anyRequest().authenticated()
            .and().build();
    }

    //TODO: add password encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
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

}
