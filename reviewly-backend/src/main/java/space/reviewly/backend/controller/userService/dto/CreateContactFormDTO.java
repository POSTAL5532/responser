package space.reviewly.backend.controller.userService.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateContactFormDTO {

    @NotBlank(message = "User name must be specified")
    @Size(min = 2, max = 255, message = "User name must be from 2 to 255 characters")
    private String username;

    @NotBlank(message = "Email must be specified")
    @Email(message = "Email is incorrect")
    private String email;

    @NotBlank(message = "Text must be specified")
    @Size(min = 2, max = 1000, message = "Text be from 2 to 1000 characters")
    private String text;
}
