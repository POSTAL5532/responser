package space.reviewly.authserver.config;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;
import org.springframework.stereotype.Component;

/**
 * Custom auth server application properties.
 *
 * @author Shcherbachenya Igor
 */
@Getter
@Setter
@Component("applicationProperties")
@ConfigurationProperties(prefix = "reviewly")
public class ApplicationProperties {

    private List<ClientCredentials> clientCredentials;

    private List<String> allowedOrigins;

    @NotNull
    private RunMode runMode;

    @NotEmpty
    private String selfHost;

    @NotBlank
    private String noReplyEmail;

    @NotBlank
    private String contactEmail;

    @NotEmpty
    private String frontendAppUrl;

    @NotEmpty
    private String registrationPageUrl;

    @NotEmpty
    private String forgotPasswordPageUrl;

    @NotEmpty
    private String downloadExtensionChrome;

    @NotBlank
    private String fileStorageUrl;

    @NotBlank
    private String fileStorageBucket;

    @NotBlank
    private String fileStorageUrlCommon;

    @Getter
    @Setter
    @ToString
    public static class ClientCredentials {

        private String clientId;

        private String clientSecret;

        private String redirectUri;

        private long accessTokenTimeLifeMinutes;

        private long refreshTokenTimeLifeHours;
    }
}
