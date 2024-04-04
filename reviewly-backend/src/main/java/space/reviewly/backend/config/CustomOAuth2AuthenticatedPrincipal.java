package space.reviewly.backend.config;

import java.util.Collection;
import java.util.Map;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

@Getter
public class CustomOAuth2AuthenticatedPrincipal extends JwtAuthenticationToken {

    private final String userId;
    private final Map<String, Object> attributes;

    public CustomOAuth2AuthenticatedPrincipal(Jwt jwt, String userId, String email, Collection<? extends GrantedAuthority> authorities, Map<String, Object> attributes) {
        super(jwt, authorities, email);

        this.userId = userId;
        this.attributes = attributes;
    }

}
