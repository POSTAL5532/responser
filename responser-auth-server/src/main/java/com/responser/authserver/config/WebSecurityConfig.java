package com.responser.authserver.config;

import com.responser.authserver.controller.CommonController;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
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

    private final ApplicationProperties properties;

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        corsCustomizer.corsCustomizer(http);

        return http
            .csrf().disable()
            .formLogin()
            .loginPage(CommonController.LOGIN_URL).failureUrl(CommonController.LOGIN_URL + "?error=true")
            .and().logout().logoutUrl(CommonController.LOGOUT_URL).logoutSuccessUrl(properties.getSelfHost())
            .and().authorizeHttpRequests()
            .requestMatchers("/", CommonController.LOGIN_URL, CommonController.LOGOUT_URL).permitAll()
            .anyRequest().authenticated()
            .and().build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
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
