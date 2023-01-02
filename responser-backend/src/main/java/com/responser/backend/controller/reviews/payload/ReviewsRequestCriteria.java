package com.responser.backend.controller.reviews.payload;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * Reviews request criteria. Uses for define the reviews lists selection criteria.
 *
 * @author Shcherbachenya Igor
 */
@Data
public class ReviewsRequestCriteria {

    @NotBlank
    private String resourceId;

    private String excludeUserId;

    private String forUserId;

    private String resourceType;
}
