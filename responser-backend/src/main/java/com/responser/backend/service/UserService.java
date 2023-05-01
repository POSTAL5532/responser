package com.responser.backend.service;

import com.responser.backend.model.EmailConfirmation;
import com.responser.backend.model.User;
import com.responser.backend.repository.UserRepository;
import com.responser.backend.service.email.EmailService;
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

    private final EmailService emailService;

    private final EmailConfirmationService emailConfirmationService;

    @Transactional
    public void registerUser(User newUser) {
        log.info("Register new not confirmed user: {}", newUser.getUserName());
        newUser.setEmailConfirmed(false);
        userRepository.save(newUser);
        EmailConfirmation emailConfirmation = emailConfirmationService.createEmailConfirmation(newUser.getId());
        emailService.sendEmailConfirmationMessage(newUser.getEmail(), emailConfirmation);
    }

    @Transactional
    public void confirmEmail(String confirmationId) {
        log.info("Confirm email by confirmation id {}.", confirmationId);
        EmailConfirmation emailConfirmation = emailConfirmationService.getById(confirmationId);
        User user = getUser(emailConfirmation.getUserId());
        user.setEmailConfirmed(true);
        updateUser(user);
        emailConfirmationService.deleteConfirmation(confirmationId);
    }

    @Transactional
    public void updateUser(String userId, User userUpdates) {
        userUpdates.setId(userId);
        updateUser(userUpdates);
    }

    @Transactional
    public void updateUser(User user) {
        log.info("Update user: {}", user.getId());
        userRepository.save(user);
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
