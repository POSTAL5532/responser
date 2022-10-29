package com.responser.backend.controller.user.payload;

import com.responser.backend.utils.ValidationUtils;
import com.responser.backend.validator.EmailUniqueness;
import com.responser.backend.validator.UsernameUniqueness;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 * UserDTO
 *
 * @author SIE
 */
@Data
@NoArgsConstructor
public class CreateUserProfilePayload {

    @NotBlank(message = "Username must be specified")
    @Size(min = 2, max = 255, message = "Username must be from 2 to 255 characters")
    @UsernameUniqueness(message = "User with this username is already registered")
    private String userName;

    @NotBlank(message = "Email must be specified")
    @Email(message = "Email is incorrect")
    @EmailUniqueness(message = "User with this email is already registered")
    private String email;

    @NotBlank(message = "Password must be specified")
    @Pattern(
            regexp = ValidationUtils.PASSWORD_PATTERN,
            message = "Password must contains minimum eight characters, at least one letter and one number"
        )
    private String password;

    @NotBlank(message = "First name must be specified")
    @Size(min = 2, max = 255, message = "First name must be from 2 to 255 characters")
    private String firstName;

    @NotBlank(message = "Last name must be specified")
    @Size(min = 2, max = 255, message = "Last name must be from 2 to 255 characters")
    private String lastName;
}
