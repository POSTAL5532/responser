package com.responser.backend.controller.user.payload;

import com.responser.backend.controller.user.validation.EmailUniqueness;
import com.responser.backend.controller.user.validation.UsernameUniqueness;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * UserDTO
 *
 * @author Shcherbachenya Igor
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
            regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
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
