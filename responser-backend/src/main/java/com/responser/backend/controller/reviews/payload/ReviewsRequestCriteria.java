package com.responser.backend.controller.reviews.payload;

import com.responser.backend.model.ResourceType;
import com.responser.backend.model.ReviewsCriteriaSortingField;
import lombok.Data;
import org.springframework.data.domain.Sort;

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

    private ResourceType resourceType;

    private ReviewsCriteriaSortingField sortingField;

    private Sort.Direction sortDirection;
}
