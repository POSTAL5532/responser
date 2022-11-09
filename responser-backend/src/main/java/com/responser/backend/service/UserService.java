package com.responser.backend.service;

import com.responser.backend.model.User;
import com.responser.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.MessageFormat;
import java.util.NoSuchElementException;

/**
 * UserService
 *
 * @author SIE
 */
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
        return userRepository.findById(userId).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format("User with id ''{0}'' doesn't exist", userId))
        );
    }

    public User getUserByUserName(String userName) {
        return userRepository.findByUserName(userName).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format("User with id ''{0}'' doesn't exist", userName))
        );
    }

    public boolean existByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existByUserName(String username) {
        return userRepository.existsByUserName(username);
    }
}
