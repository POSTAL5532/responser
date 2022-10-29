package com.responser.backend.controller.user.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * UserInfoPayload
 *
 * @author SIE
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoPayload {

    private String userName;

    private String email;

    private String firstName;

    private String lastName;

    private LocalDateTime creationDate;

    private LocalDateTime updateDate;
}
