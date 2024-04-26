package space.reviewly.authserver.security.socialLogin;

import java.util.Collection;
import java.util.Set;
import java.util.function.Consumer;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import space.reviewly.authserver.model.user.RegisteredBy;
import space.reviewly.authserver.model.user.Role;
import space.reviewly.authserver.model.user.User;
import space.reviewly.authserver.service.RoleService;
import space.reviewly.authserver.service.UserService;

@Component
@RequiredArgsConstructor
public class UserServiceOAuth2UserHandler implements Consumer<OidcUser> {

    private final UserService userService;

    private final RoleService roleService;

    @Override
    public void accept(OidcUser user) {
        // Capture user in a local data store on first authentication
        CustomOidcUser oidcUser = (CustomOidcUser) user;

        if (oidcUser.getId() == null && this.userService.getByEmail(user.getEmail()) == null) {
            Collection<GrantedAuthority> grantedAuthorities = (Collection<GrantedAuthority>) oidcUser.getAuthorities();
            User localUser = toUser(oidcUser);
            Role defaultRole = roleService.getDefaultRole();

            if (defaultRole != null) {
                localUser.setRoles(Set.of(defaultRole));
            }

            this.userService.registerUser(localUser);

            if (!CollectionUtils.isEmpty(localUser.getRoles())) {
                Set<? extends GrantedAuthority> authorities = localUser.getRoles().stream()
                    .flatMap(role -> role.getAuthorities().stream()
                        .map(authority -> new SimpleGrantedAuthority(authority.getName()))
                    )
                    .collect(Collectors.toSet());

                grantedAuthorities.addAll(authorities);
            }

            oidcUser.setId(localUser.getId());
        }
    }

    public User toUser(CustomOidcUser oidcUser) {
        User user = new User();

        user.setId(oidcUser.getId());
        user.setEmail(oidcUser.getEmail());
        user.setFullName(oidcUser.getFullName());
        user.setEmailConfirmed(true);
        user.setRegisteredBy(RegisteredBy.GOOGLE);
        user.setAvatarFileName(oidcUser.getPicture());
        user.setPassword("PASSWORD_STUB");

        return user;
    }
}
