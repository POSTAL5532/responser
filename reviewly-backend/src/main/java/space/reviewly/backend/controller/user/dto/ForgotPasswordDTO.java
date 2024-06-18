package space.reviewly.backend.controller.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ForgotPasswordDTO {

    @NotBlank(message = "Email must be specified")
    @Email(message = "Email is incorrect")
    private String email;
}
