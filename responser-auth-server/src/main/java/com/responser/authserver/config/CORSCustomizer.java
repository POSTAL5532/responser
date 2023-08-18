package com.responser.authserver.config;

import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

/**
 * CORS config class. Allow to include custom cors configuration. Uses for cors configs from app properties.
 */
@RequiredArgsConstructor
@Component
public class CORSCustomizer {

    private final ApplicationProperties applicationProperties;

    public void corsCustomizer(HttpSecurity http) throws Exception {
        http.cors(c -> {
            CorsConfigurationSource source = s -> {
                CorsConfiguration cc = new CorsConfiguration();
                cc.setAllowCredentials(true);
                cc.setAllowedOrigins(applicationProperties.getAllowedOrigins());
                cc.setAllowedHeaders(Collections.singletonList(CorsConfiguration.ALL));
                cc.setAllowedMethods(Collections.singletonList(CorsConfiguration.ALL));
                return cc;
            };

            c.configurationSource(source);
        });
    }
}
