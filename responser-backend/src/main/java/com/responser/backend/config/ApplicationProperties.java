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
@ConfigurationProperties(prefix = "responser")
public class ApplicationProperties {

    public static final String API_ROOT_PATH = "/api";

    @NotNull
    private RunMode runMode;

    @NotBlank
    private String selfHost;

    @NotBlank
    private String feApplicationUrl;

    @NotBlank
    private String authTokenUrl;

    @NotBlank
    private String authLoginPageUrl;

    @NotBlank
    private String authLogoutPageUrl;

    @NotBlank
    private String authRedirectUri;

    @NotBlank
    private String signUpPageUrl;

    @NotBlank
    private String unauthorizedPageUrl;

    @NotBlank
    private String clientId;

    @NotBlank
    private String clientSecret;

    @NotBlank
    private String downloadExtensionChrome;

    @NotBlank
    private String chromeExtensionId;

    @NotBlank
    private String responserInfoEmail;

    private List<String> allowedOrigins;
}