package space.reviewly.authserver.security.grantPassword;

import java.io.Serial;
import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import lombok.Getter;
import org.springframework.lang.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.authorization.authentication.OAuth2AuthorizationGrantAuthenticationToken;
import org.springframework.util.Assert;

@Getter
public class GrantPasswordAuthenticationToken extends OAuth2AuthorizationGrantAuthenticationToken {

    @Serial
    private static final long serialVersionUID = 1L;
    private final String username;
    private final String password;
    private final Set<String> scopes;

    public GrantPasswordAuthenticationToken(
        Authentication clientPrincipal,
        String username,
        String password,
        @Nullable Set<String> scopes,
        @Nullable Map<String, Object> additionalParameters
    ) {
        super(AuthorizationGrantTypePassword.GRANT_PASSWORD, clientPrincipal, additionalParameters);

        Assert.hasText(username, "username cannot be empty");
        Assert.hasText(password, "password cannot be empty");

        this.username = username;
        this.password = password;

        this.scopes = Collections.unmodifiableSet(scopes != null ? new HashSet<>(scopes) : Collections.emptySet());
    }
}
