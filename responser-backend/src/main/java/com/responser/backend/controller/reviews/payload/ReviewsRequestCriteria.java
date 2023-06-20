package com.responser.backend.controller.reviews.payload;

import lombok.Data;

/**
 * Reviews request criteria. Uses for define the reviews lists selection criteria.
 *
 * @author Shcherbachenya Igor
 */
@Data
public class ReviewsRequestCriteria {

    private String resourceId;

    private String excludeUserId;

    private String forUserId;

    private String resourceType;
}
