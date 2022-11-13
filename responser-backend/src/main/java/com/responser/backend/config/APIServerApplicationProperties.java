package com.responser.backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

/**
 * AuthServerApplicationProperties
 *
 * @author SIE
 */
@Getter
@Setter
@ConfigurationProperties(prefix = "responser.api")
public class APIServerApplicationProperties {

    private List<String> allowedOrigins;
}