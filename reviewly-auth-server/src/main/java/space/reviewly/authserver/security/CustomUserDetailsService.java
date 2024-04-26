package space.reviewly.authserver.security;

import java.util.Objects;
import space.reviewly.authserver.model.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import space.reviewly.authserver.service.UserService;

/**
 * Custom user details service.
 *
 * @author Shcherbachenya Igor
 */
@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserService userService;

    /**
     * Load user by login or email.
     *
     * @param email the email identifying the user whose data is required.
     * @return user details instance
     * @throws UsernameNotFoundException user not found exception
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userService.getByEmail(email);

        if (Objects.isNull(user)) {
            throw new UsernameNotFoundException(MessageFormat.format("User with email ''{0}'' doesn't exist", email));
        }

        return new UserDetailsImpl(user);
    }
}
