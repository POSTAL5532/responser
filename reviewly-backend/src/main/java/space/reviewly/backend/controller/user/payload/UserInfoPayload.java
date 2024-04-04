package space.reviewly.backend.controller.user.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * UserInfoPayload
 *
 * @author Shcherbachenya Igor
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoPayload {

    private String id;

    private String email;

    private String fullName;

    private String avatarFileName;

    private Boolean emailConfirmed;

    private Double reviewsCommonRating;

    private LocalDateTime creationDate;

    private LocalDateTime updateDate;
}
