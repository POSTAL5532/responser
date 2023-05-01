package com.responser.backend.config;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    public static final String API_ROOT_PATH = "/api";

    private List<String> allowedOrigins;

    @NotNull
    private RunMode runMode;

    @NotBlank
    private String feApplicationUrl;

    @NotBlank
    private String selfHost;

    private String mockEmail;

    @NotBlank
    private String responserInfoEmail;
}