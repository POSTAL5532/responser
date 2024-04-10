package space.reviewly.backend.controller.userService.payload;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactFormPayload {

    private String id;

    private String username;

    private String email;

    private String text;

    private LocalDateTime creationDate;

    private LocalDateTime updateDate;
}
