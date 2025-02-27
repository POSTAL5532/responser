package space.reviewly.backend.controller.user.dto;

import space.reviewly.backend.utils.ValidationUtils;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateUserPasswordDTO {

    private String oldPassword;

    @NotBlank(message = "New password must be specified")
    @Pattern(
        regexp = ValidationUtils.PASSWORD_VALIDITY_REGEXP,
        message = "Password must contains minimum eight characters, at least one letter and one number"
    )
    private String newPassword;
}
