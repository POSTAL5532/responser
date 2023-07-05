package com.responser.backend.controller.user.payload;

import com.responser.backend.utils.ValidationUtils;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateUserPasswordPayload {

    @NotBlank(message = "Old password must be specified")
    private String oldPassword;

    @NotBlank(message = "New password must be specified")
    @Pattern(
        regexp = ValidationUtils.PASSWORD_VALIDITY_REGEXP,
        message = "Password must contains minimum eight characters, at least one letter and one number"
    )
    private String newPassword;
}
