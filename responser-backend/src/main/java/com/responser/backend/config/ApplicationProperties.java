package com.responser.backend.config;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.net.URISyntaxException;
import lombok.Getter;
import lombok.Setter;
import org.apache.hc.core5.net.URIBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;
import org.springframework.stereotype.Component;

/**
 * Custom API application properties.
 *
 * @author Shcherbachenya Igor
 */
@Getter
@Setter
@Component("applicationProperties")
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
    private String authApplicationUrl;

    @NotBlank
    private String authLoginPageUrl;

    @NotBlank
    private String authLogoutPageUrl;

    @NotBlank
    private String authRedirectUri;

    @NotBlank
    private String restorePasswordPageUrl;

    @NotBlank
    private String signUpPageUrl;

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

    public String getLoginUrl() throws URISyntaxException {
        URIBuilder loginUrlBuilder = new URIBuilder(this.authLoginPageUrl);
        loginUrlBuilder.addParameter("response_type", "code");
        loginUrlBuilder.addParameter("client_id", clientId);
        loginUrlBuilder.addParameter("redirect_uri", authRedirectUri);

        return loginUrlBuilder.build().toString();
    }
}