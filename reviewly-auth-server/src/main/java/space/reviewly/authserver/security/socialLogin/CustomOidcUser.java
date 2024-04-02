package space.reviewly.authserver.security.socialLogin;

import java.util.Collection;
import java.util.HashSet;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.core.oidc.IdTokenClaimNames;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import space.reviewly.authserver.model.User;
import space.reviewly.authserver.security.CustomUserDetails;

public class CustomOidcUser extends DefaultOidcUser implements CustomUserDetails {

    private String id;

    private String username;

    private Collection<? extends GrantedAuthority> authorities = new HashSet<>();

    public CustomOidcUser(Collection<? extends GrantedAuthority> authorities, OidcIdToken idToken) {
        super(authorities, idToken, null, IdTokenClaimNames.SUB);
    }

    public CustomOidcUser(Collection<? extends GrantedAuthority> authorities, OidcIdToken idToken, String nameAttributeKey) {
        super(authorities, idToken, null, nameAttributeKey);
    }

    public CustomOidcUser(Collection<? extends GrantedAuthority> authorities, OidcIdToken idToken, OidcUserInfo userInfo) {
        this(authorities, idToken, userInfo, IdTokenClaimNames.SUB);
    }

    public CustomOidcUser(Collection<? extends GrantedAuthority> authorities, OidcIdToken idToken, OidcUserInfo userInfo, String nameAttributeKey) {
        super(AuthorityUtils.NO_AUTHORITIES, idToken, userInfo, nameAttributeKey);

        // Keep the authorities mutable
        if (authorities != null) {
            this.authorities = authorities;
        }
    }

    public CustomOidcUser(OidcIdToken idToken, OidcUserInfo userInfo) {
        super(AuthorityUtils.NO_AUTHORITIES, idToken, userInfo);
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getId() {
        return this.id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }

    @Override
    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public void setPassword(String password) {
        // do nothing
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    public User toInstantUser() {
        User user = new User();

        user.setId(getId());
        user.setEmail(getEmail());
        user.setFullName(getFullName());
        user.setEmailConfirmed(true);
        user.setAvatarFileName(getPicture());
        user.setPassword("PASSWORD_STUB");

        return user;
    }
}
