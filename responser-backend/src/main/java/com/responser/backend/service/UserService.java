package com.responser.backend.service;

import com.responser.backend.model.User;
import com.responser.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.MessageFormat;
import java.util.Collections;
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

    private final KeycloakUserService keycloakUserService;

    @Transactional
    public void registerUser(User newUser) {
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setUsername(newUser.getUserName());
        userRepresentation.setEmail(newUser.getEmail());
        userRepresentation.setFirstName(newUser.getFirstName());
        userRepresentation.setLastName(newUser.getLastName());
        userRepresentation.setEnabled(true);
        userRepresentation.setEmailVerified(true);

        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setTemporary(false);
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(newUser.getPassword());
        userRepresentation.setCredentials(Collections.singletonList(credential));

        keycloakUserService.registerUser(userRepresentation);
        UserRepresentation savedUserRepresentation = keycloakUserService.getUserByUserName(userRepresentation.getUsername());

        newUser.setId(savedUserRepresentation.getId());
        userRepository.save(newUser);
    }

    @Transactional
    public void updateUser(String userId, User userUpdates) {
        UserRepresentation userRepresentation = keycloakUserService.getUser(userId);
        userRepresentation.setUsername(userUpdates.getUserName());
        userRepresentation.setEmail(userUpdates.getEmail());
        userRepresentation.setFirstName(userUpdates.getFirstName());
        userRepresentation.setLastName(userUpdates.getLastName());

        keycloakUserService.updateUser(userId, userRepresentation);

        userUpdates.setId(userId);

        userRepository.save(userUpdates);
    }

    public User getUser(String userId) {
        return userRepository.findById(userId).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format("User with id ''{0}'' doesn't exist", userId)
                ));
    }

    public boolean existByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existByUserName(String username) {
        return userRepository.existsByUserName(username);
    }
}
