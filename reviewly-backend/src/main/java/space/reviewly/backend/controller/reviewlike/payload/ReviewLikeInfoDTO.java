package space.reviewly.backend.controller.reviewlike.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Review like info DTO. Uses for creation and updating {@link space.reviewly.backend.model.Page} by API
 *
 * @author Shcherbachenya Igor
 */
@Data
@NoArgsConstructor
public class ReviewLikeInfoDTO {

    @NotBlank(message = "reviewId must be specified")
    private String reviewId;

    @NotNull(message = "positive must be specified")
    private Boolean positive;
}
