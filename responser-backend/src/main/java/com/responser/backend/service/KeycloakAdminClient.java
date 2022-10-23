package com.responser.backend.service;

import com.responser.backend.config.KeycloakAdminClientConfig;
import com.responser.backend.model.UserAccountDataPayload;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * KeycloakAdminClient
 *
 * @author SIE
 */
@Service
@RequiredArgsConstructor
public class KeycloakAdminClient {

    private final Keycloak keycloak;

    private final KeycloakAdminClientConfig keycloakAdminClientConfig;

    public void createUser(UserAccountDataPayload newUser) {
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setUsername(newUser.getUserName());
        userRepresentation.setEmail(newUser.getEmailId());
        userRepresentation.setFirstName(newUser.getFirstName());
        userRepresentation.setLastName(newUser.getLastName());

        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setTemporary(false);
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(newUser.getPassword());

        userRepresentation.setCredentials(Collections.singletonList(credential));

        this.getUserResource().create(userRepresentation);
    }

    public void updateUser(String userId, UserAccountDataPayload user) {
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setUsername(user.getUserName());
        userRepresentation.setEmail(user.getEmailId());
        userRepresentation.setFirstName(user.getFirstName());
        userRepresentation.setLastName(user.getLastName());

        this.getUserResource().get(userId).update(userRepresentation);
    }

    public UserRepresentation getUser(String userId) {
        return this.getUserResource().get(userId).toRepresentation();
    }

    public boolean userWithEmailExist(String email) {
        return !this.getUserResource().search(email, 0, 1).isEmpty();
    }

    public boolean userWithUsernameExist(String username) {
        return !this.getUserResource().search(username).isEmpty();
    }

    private UsersResource getUserResource() {
        return this.keycloak.realm(keycloakAdminClientConfig.getRealmName()).users();
    }
}
