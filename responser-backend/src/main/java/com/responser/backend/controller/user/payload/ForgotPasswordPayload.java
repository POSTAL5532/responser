package com.responser.backend.controller.user.payload;

import com.responser.backend.controller.user.validation.EmailUniqueness;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ForgotPasswordPayload {

    @NotBlank(message = "Email must be specified")
    @Email(message = "Email is incorrect")
    @EmailUniqueness(message = "User with this email is already registered")
    private String email;
}
