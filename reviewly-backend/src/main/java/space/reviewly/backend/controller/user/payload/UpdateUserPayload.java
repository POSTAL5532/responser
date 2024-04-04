package space.reviewly.backend.controller.user.payload;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * UpdateUserPayload
 *
 * @author Shcherbachenya Igor
 */
@Data
@NoArgsConstructor
public class UpdateUserPayload {

    @NotBlank(message = "Email must be specified")
    @Email(message = "Email is incorrect")
    private String email;

    @NotBlank(message = "Full name must be specified")
    @Size(min = 2, max = 255, message = "Full name must be from 2 to 255 characters")
    private String fullName;
}
