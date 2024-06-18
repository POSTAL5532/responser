package space.reviewly.backend.controller.user.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import space.reviewly.backend.model.user.RegisteredBy;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

    private String id;

    private String email;

    private String fullName;

    private String avatarFileName;

    private Boolean emailConfirmed;

    private RegisteredBy registeredBy;

    private Boolean isUsePasswordStub;

    private Boolean isBlocked;

    private Double reviewsCommonRating;

    private LocalDateTime creationDate;

    private LocalDateTime updateDate;
}
