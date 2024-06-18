package space.reviewly.backend.controller.user.dto;

import space.reviewly.backend.controller.user.validation.EmailUniqueness;
import space.reviewly.backend.utils.ValidationUtils;
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
public class CreateUserProfileDTO {

    @NotBlank(message = "Email must be specified")
    @Email(message = "Email is incorrect")
    @EmailUniqueness(message = "User with this email is already registered")
    private String email;

    @NotBlank(message = "Password must be specified")
    @Pattern(
            regexp = ValidationUtils.PASSWORD_VALIDITY_REGEXP,
            message = "Password must contains minimum eight characters, at least one letter and one number"
        )
    private String password;

    @NotBlank(message = "Full name must be specified")
    @Size(min = 2, max = 255, message = "Full name must be from 2 to 255 characters")
    private String fullName;
}
