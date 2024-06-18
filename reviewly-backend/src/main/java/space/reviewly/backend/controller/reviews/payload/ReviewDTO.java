package space.reviewly.backend.controller.reviews.payload;

import space.reviewly.backend.controller.reviewlike.payload.ReviewLikeDTO;
import space.reviewly.backend.controller.user.dto.UserBasicDTO;
import space.reviewly.backend.controller.webresource.payload.WebResourceDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Collection;

/**
 * Review like DTO payload.
 *
 * @author Shcherbachenya Igor
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDTO {

    private String id;

    private UserBasicDTO user;

    private String resourceId;

    private String reviewId;

    private Byte rating;

    private String text;

    private Collection<ReviewLikeDTO> reviewLikes;

    private WebResourceDTO webResource;

    private LocalDateTime creationDate;

    private LocalDateTime updateDate;
}
