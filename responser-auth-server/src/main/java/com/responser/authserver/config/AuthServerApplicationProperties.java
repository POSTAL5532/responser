package com.responser.authserver.config;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

/**
 * AuthServerApplicationProperties
 *
 * @author SIE
 */
@Getter
@Setter
@ConfigurationProperties(prefix = "responser.auth")
public class AuthServerApplicationProperties {

    private List<ClientCredentials> clientCredentials;

    private List<String> allowedOrigins;

    @Getter
    @Setter
    @ToString
    public static class ClientCredentials {

        private String clientId;

        private String clientSecret;

        private String redirectUri;
    }
}
