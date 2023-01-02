package com.responser.backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

/**
 * Custom API application properties.
 *
 * @author Shcherbachenya Igor
 */
@Getter
@Setter
@ConfigurationProperties(prefix = "responser.api")
public class APIServerApplicationProperties {

    private List<String> allowedOrigins;
}