package space.reviewly.authserver.config;

import jakarta.validation.constraints.NotEmpty;
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

    @NotEmpty
    private String selfHost;

    @NotEmpty
    private String frontendAppUrl;

    @NotEmpty
    private String registrationPageUrl;

    @NotEmpty
    private String forgotPasswordPageUrl;

    @Getter
    @Setter
    @ToString
    public static class ClientCredentials {

        private String clientId;

        private String clientSecret;

        private String redirectUri;
    }
}
