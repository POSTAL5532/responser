package space.reviewly.authserver.service;

import space.reviewly.authserver.model.UserDetailsImpl;
import space.reviewly.authserver.model.User;
import space.reviewly.authserver.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;

/**
 * Custom user details service.
 *
 * @author Shcherbachenya Igor
 */
@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    /**
     * Load user by login or email.
     *
     * @param username the username identifying the user whose data is required.
     * @return user details instance
     * @throws UsernameNotFoundException user not found exception
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user;

        if (username.contains("@")) {
            user = userRepository.findByEmail(username)
                    .orElseThrow(() -> new UsernameNotFoundException(MessageFormat.format(
                            "User with email ''{0}'' doesn't exist", username
                    )));
        } else {
            user = userRepository.findByUserName(username)
                    .orElseThrow(() -> new UsernameNotFoundException(MessageFormat.format(
                            "User with username ''{0}'' doesn't exist", username
                    )));
        }

        return new UserDetailsImpl(user);
    }
}
