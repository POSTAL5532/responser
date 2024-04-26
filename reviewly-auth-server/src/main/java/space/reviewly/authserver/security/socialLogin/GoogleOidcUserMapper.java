package space.reviewly.authserver.security.socialLogin;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.StandardClaimNames;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;
import space.reviewly.authserver.model.user.User;

@Component("google")
public class GoogleOidcUserMapper implements OidcUserMapper {

    public OidcUser map(OidcUser oidcUser) {
        CustomOidcUser user = new CustomOidcUser(oidcUser.getIdToken(), oidcUser.getUserInfo());
        user.setUsername(oidcUser.getEmail());
        return user;
    }

    public OidcUser map(OidcIdToken idToken, OidcUserInfo userInfo, User user) {
        Set<GrantedAuthority> authorities = user.getRoles().stream()
            .flatMap(role -> role.getAuthorities().stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getName()))
            )
            .collect(Collectors.toSet());

        Map<String, Object> claims = new HashMap<>(idToken.getClaims());
        claims.put(StandardClaimNames.PICTURE, user.getAvatarFileName());
        claims.put(StandardClaimNames.NAME, user.getFullName());

        OidcIdToken customIdToken = new OidcIdToken(
            idToken.getTokenValue(), idToken.getIssuedAt(), idToken.getExpiresAt(), claims
        );

        CustomOidcUser oidcUser = new CustomOidcUser(authorities, customIdToken, userInfo);
        oidcUser.setId(user.getId());
        oidcUser.setUsername(user.getEmail());
        return oidcUser;
    }
}
