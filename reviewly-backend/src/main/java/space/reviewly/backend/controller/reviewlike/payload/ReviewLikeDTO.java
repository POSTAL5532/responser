package space.reviewly.backend.controller.reviewlike.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Review like DTO payload.
 *
 * @author Shcherbachenya Igor
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewLikeDTO {

    private String id;

    private String userId;

    private String reviewId;

    private Boolean positive;

    private LocalDateTime creationDate;

    private LocalDateTime updateDate;
}
