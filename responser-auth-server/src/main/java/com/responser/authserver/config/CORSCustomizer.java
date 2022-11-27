package com.responser.authserver.config;

import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@RequiredArgsConstructor
@Component
public class CORSCustomizer {

    private final AuthServerApplicationProperties authServerApplicationProperties;

    public void corsCustomizer(HttpSecurity http) throws Exception {
        http.cors(c -> {
            CorsConfigurationSource source = s -> {
                CorsConfiguration cc = new CorsConfiguration();
                cc.setAllowCredentials(true);
                cc.setAllowedOrigins(authServerApplicationProperties.getAllowedOrigins());
                cc.setAllowedHeaders(Collections.singletonList(CorsConfiguration.ALL));
                cc.setAllowedMethods(Collections.singletonList(CorsConfiguration.ALL));
                return cc;
            };

            c.configurationSource(source);
        });
    }
}
