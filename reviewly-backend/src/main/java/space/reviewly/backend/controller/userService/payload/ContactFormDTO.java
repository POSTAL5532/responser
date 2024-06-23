package space.reviewly.backend.controller.userService.payload;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactFormDTO {

    private String id;

    private String username;

    private String email;

    private String text;

    private boolean read;

    private LocalDateTime creationDate;

    private LocalDateTime updateDate;
}
