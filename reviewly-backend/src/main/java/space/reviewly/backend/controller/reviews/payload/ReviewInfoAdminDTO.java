package space.reviewly.backend.controller.reviews.payload;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import space.reviewly.backend.model.review.Review;

/**
 * Review like info DTO. Uses for creation and updating {@link Review} by API
 *
 * @author Shcherbachenya Igor
 */
@Data
@NoArgsConstructor
public class ReviewInfoAdminDTO {

    @NotBlank(message = "resourceId must be specified")
    private String resourceId;

    @NotBlank(message = "user ID must be specified")
    private String userId;

    @NotNull(message = "rating must be specified")
    @Min(value = 1, message = "rating must be in range between 1 and 5")
    @Max(value = 5, message = "rating must be in range between 1 and 5")
    private Byte rating;

    @NotBlank(message = "text must be specified")
    @Size(min = 1, max = 460, message = "text must be in range between 1 and 460")
    private String text;
}
