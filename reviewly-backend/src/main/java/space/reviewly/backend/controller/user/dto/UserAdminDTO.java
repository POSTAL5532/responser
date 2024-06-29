package space.reviewly.backend.controller.user.dto;

import java.time.LocalDateTime;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import space.reviewly.backend.model.user.RegisteredBy;
import space.reviewly.backend.model.user.UserSpamIndicator;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAdminDTO {

    private String id;

    private String email;

    private String fullName;

    private String avatarFileName;

    private Boolean emailConfirmed;

    private RegisteredBy registeredBy;

    private Boolean isUsePasswordStub;

    private Set<RoleDTO> roles;

    private UserSpamIndicator userSpamIndicator;

    private Double reviewsCommonRating;

    private LocalDateTime creationDate;

    private LocalDateTime updateDate;
}
