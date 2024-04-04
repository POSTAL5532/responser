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
import space.reviewly.authserver.model.Role;
import space.reviewly.authserver.model.User;
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
            User localUser = oidcUser.toInstantUser();
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
}
