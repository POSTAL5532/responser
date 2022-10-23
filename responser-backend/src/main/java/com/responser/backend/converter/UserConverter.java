package com.responser.backend.converter;

import com.responser.backend.model.User;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.TimeZone;

/**
 * UserConverter
 *
 * @author SIE
 */
@Service
public class UserConverter {

    public User toUser(UserRepresentation userRepresentation) {
        return User.builder()
                .id(userRepresentation.getId())
                .userName(userRepresentation.getUsername())
                .email(userRepresentation.getEmail())
                .createdTimestamp(LocalDateTime.ofInstant(
                        Instant.ofEpochSecond(userRepresentation.getCreatedTimestamp()),
                        TimeZone.getDefault().toZoneId()
                ))
                .firstName(userRepresentation.getFirstName())
                .lastName(userRepresentation.getLastName())
                .build();
    }
}
