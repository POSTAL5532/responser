package com.responser.backend.model;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * User
 *
 * @author SIE
 */
@Data
@Builder
public class User {

    private String id;

    private String userName;

    private String email;

    private String firstName;

    private String lastName;

    private LocalDateTime createdTimestamp;
}
