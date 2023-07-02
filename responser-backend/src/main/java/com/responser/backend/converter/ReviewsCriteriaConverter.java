package com.responser.backend.converter;

import com.responser.backend.controller.reviews.payload.ReviewsRequestCriteria;
import com.responser.backend.model.ResourceType;
import com.responser.backend.model.ReviewsCriteria;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

/**
 * {@link ReviewsCriteria}, {@link ReviewsRequestCriteria} converter.
 *
 * @author Shcherbachenya Igor
 */
@Service
public class ReviewsCriteriaConverter {

    public ReviewsCriteria toReviewsCriteria(ReviewsRequestCriteria requestCriteria) {
        return ReviewsCriteria.builder()
            .resourceId(requestCriteria.getResourceId())
            .excludeUserId(requestCriteria.getExcludeUserId())
            .forUserId(requestCriteria.getForUserId())
            .sortingField(requestCriteria.getSortingField())
            .sortDirection(requestCriteria.getSortDirection())
            .resourceType(
                StringUtils.isNotBlank(requestCriteria.getResourceType())
                    ? ResourceType.valueOf(requestCriteria.getResourceType())
                    : null
            )
            .build();
    }
}
