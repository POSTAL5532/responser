package com.responser.backend.service;

import lombok.RequiredArgsConstructor;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.NoSuchElementException;

/**
 * UserService
 *
 * @author SIE
 */
@RequiredArgsConstructor
@Service
public class KeycloakUserService {

    private final KeycloakAdminClient keycloakAdminClient;

    public void registerUser(UserRepresentation newUser) {
        keycloakAdminClient.createUser(newUser);
    }

    public void updateUser(String userId, UserRepresentation user) {
        keycloakAdminClient.updateUser(userId, user);
    }

    public UserRepresentation getUser(String userId) {
        return keycloakAdminClient.getUser(userId).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format("User representation with id ''{0}'' doesn't exist", userId
                ))
        );
    }

    public UserRepresentation getUserByUserName(String userName) {
        return keycloakAdminClient.getUserByUserName(userName.toLowerCase()).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format(
                        "User representation with username ''{0}'' doesn't exist",
                        userName
                ))
        );
    }

    public boolean existByEmail(String email) {
        return keycloakAdminClient.userWithEmailExist(email);
    }

    public boolean existByUserName(String username) {
        return keycloakAdminClient.userWithUsernameExist(username);
    }
}
