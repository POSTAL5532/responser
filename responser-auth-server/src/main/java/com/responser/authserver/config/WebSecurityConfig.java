package com.responser.authserver.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;

/**
 * WebSecurityConfig
 *
 * @author SIE
 */
@RequiredArgsConstructor
@Configuration
public class WebSecurityConfig {

    private final AuthServerApplicationProperties authServerApplicationProperties;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.formLogin()
                .and().cors().configurationSource(corsConfigurationSource())
                .and().authorizeRequests().anyRequest().authenticated()
                .and().build();
    }

    //TODO: add password encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(authServerApplicationProperties.getAllowedOrigins());
        configuration.setAllowedMethods(Collections.singletonList(CorsConfiguration.ALL));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Collections.singletonList(CorsConfiguration.ALL));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
