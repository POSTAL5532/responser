package com.responser.backend.service;

import com.responser.backend.converter.UserConverter;
import com.responser.backend.model.User;
import com.responser.backend.model.UserAccountDataPayload;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * UserService
 *
 * @author SIE
 */
@RequiredArgsConstructor
@Service
public class UserService {

    private final KeycloakAdminClient keycloakAdminClient;

    private final UserConverter userConverter;

    public void registerUser(UserAccountDataPayload newUser) {
        keycloakAdminClient.createUser(newUser);
    }

    public void updateUser(String userId, UserAccountDataPayload user) {
        keycloakAdminClient.updateUser(userId, user);
    }

    public User getUser(String userId) {
        return userConverter.toUser(keycloakAdminClient.getUser(userId));
    }

    public boolean existByEmail(String email) {
        return keycloakAdminClient.userWithEmailExist(email);
    }

    public boolean existByUserName(String username) {
        return keycloakAdminClient.userWithUsernameExist(username);
    }
}
