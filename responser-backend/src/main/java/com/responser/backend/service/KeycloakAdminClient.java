package com.responser.backend.service;

import com.responser.backend.config.KeycloakAdminClientConfig;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Optional;

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

    public Response createUser(UserRepresentation newUser) {
        return this.getUserResource().create(newUser);
    }

    public void updateUser(String userId, UserRepresentation user) {
        this.getUserResource().get(userId).update(user);
    }

    public Optional<UserRepresentation> getUser(String userId) {
        UserResource userResource = this.getUserResource().get(userId);

        return userResource == null
                ? Optional.empty()
                : Optional.of(userResource.toRepresentation());
    }

    public Optional<UserRepresentation> getUserByUserName(String userName) {
        List<UserRepresentation> list = getUserResource().search(userName, true);
        return Optional.ofNullable(list.get(0));
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
