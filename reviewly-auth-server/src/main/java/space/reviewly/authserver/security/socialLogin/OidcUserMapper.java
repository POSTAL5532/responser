package space.reviewly.authserver.security.socialLogin;

import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import space.reviewly.authserver.model.user.User;

public interface OidcUserMapper {

    OidcUser map(OidcUser oidcUser);

    OidcUser map(OidcIdToken idToken, OidcUserInfo userInfo, User user);
}
