package com.responser.authserver.service;

import com.responser.authserver.model.UserDetailsImpl;
import com.responser.authserver.model.User;
import com.responser.authserver.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;

/**
 * CustomUserDetailsService
 *
 * @author SIE
 */
@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

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
