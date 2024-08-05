package space.reviewly.backend.controller.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * UserDTO
 *
 * @author Shcherbachenya Igor
 */
@Data
@NoArgsConstructor
public class CreateFakeUserProfileDTO {

    @NotBlank(message = "Full name must be specified")
    @Size(min = 2, max = 255, message = "Full name must be from 2 to 255 characters")
    private String fullName;
}
