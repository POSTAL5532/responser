package com.responser.backend.service;

import com.responser.backend.model.User;
import com.responser.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static java.text.MessageFormat.format;
import java.util.NoSuchElementException;

/**
 * User service.
 *
 * @author Shcherbachenya Igor
 */
@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void registerUser(User newUser) {
        userRepository.save(newUser);
    }

    @Transactional
    public void updateUser(String userId, User userUpdates) {
        userUpdates.setId(userId);
        userRepository.save(userUpdates);
    }

    public User getUser(String userId) {
        return userRepository.findById(userId).orElseThrow(() -> {
            log.error("User with id {} doesn't exist", userId);
            return new NoSuchElementException(format("User with id ''{0}'' doesn't exist", userId));
        });
    }

    public boolean existByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existByUserName(String username) {
        return userRepository.existsByUserName(username);
    }
}
