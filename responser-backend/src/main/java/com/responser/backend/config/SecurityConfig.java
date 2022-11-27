package com.responser.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

/**
 * SecurityConfig
 *
 * @author SIE
 */
@RequiredArgsConstructor
@EnableWebSecurity
@Configuration(proxyBeanMethods = false)
@EnableMethodSecurity(jsr250Enabled = true)
public class SecurityConfig {

    private final CorsConfigurationSource corsConfigurationSource;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable().cors().configurationSource(corsConfigurationSource)
                .and().authorizeHttpRequests().anyRequest().permitAll()
                .and().oauth2ResourceServer().jwt();

        return http.build();
    }
}
