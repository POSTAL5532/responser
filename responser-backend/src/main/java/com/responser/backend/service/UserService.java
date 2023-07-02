package com.responser.backend.service;

import com.responser.backend.exceptions.DataNotValidException;
import com.responser.backend.model.EmailConfirmation;
import com.responser.backend.model.User;
import com.responser.backend.model.User_;
import com.responser.backend.repository.UserRepository;
import com.responser.backend.service.email.EmailService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void registerUser(User newUser) {
        log.info("Register new not confirmed user: {}", newUser.getUserName());

        newUser.setEmailConfirmed(false);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));

        userRepository.save(newUser);
        EmailConfirmation emailConfirmation = emailConfirmationService.createEmailConfirmation(newUser.getId());
        emailService.sendEmailConfirmationMessage(newUser, emailConfirmation);
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

    public void resendConfirmationEmailForUser(String userId) {
        User user = getUser(userId);
        EmailConfirmation emailConfirmation = emailConfirmationService.getByUserId(userId);
        emailService.sendEmailConfirmationMessage(user, emailConfirmation);
    }

    @Transactional
    public void updateUser(String userId, User userUpdates) {
        User user = getUser(userId);

        validateUpdateUserData(user, userUpdates);

        if (!user.getUserName().equals(userUpdates.getUserName())) {
            user.setUserName(userUpdates.getUserName());
        }

        if (!user.getEmail().equals(userUpdates.getEmail())) {
            user.setEmail(userUpdates.getEmail());

            EmailConfirmation emailConfirmation = emailConfirmationService
                .findByUserId(userId)
                .orElseGet(() -> emailConfirmationService.createEmailConfirmation(userId));

            emailService.sendEmailConfirmationMessage(user, emailConfirmation);
        }

        if (!user.getFullName().equals(userUpdates.getFullName())) {
            user.setFullName(userUpdates.getFullName());
        }

        updateUser(user);
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

    public void validateUpdateUserData(User existingUser, User userUpdates) {
        Map<String, List<String>> fieldsErrors = new HashMap<>();

        if (!existingUser.getUserName().equals(userUpdates.getUserName()) && existByUserName(userUpdates.getUserName())) {
            fieldsErrors.put(User_.USER_NAME, List.of("User with this username already exist."));
        }

        if (!existingUser.getEmail().equals(userUpdates.getEmail()) && existByEmail(userUpdates.getEmail())) {
            fieldsErrors.put(User_.EMAIL, List.of("User with this email already exist."));
        }

        if (!fieldsErrors.isEmpty()) {
            throw new DataNotValidException("Update user data is not valid", fieldsErrors);
        }
    }
}
