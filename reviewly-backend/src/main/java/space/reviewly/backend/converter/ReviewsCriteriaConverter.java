package space.reviewly.backend.converter;

import space.reviewly.backend.controller.reviews.payload.ReviewsRequestCriteria;
import space.reviewly.backend.model.review.ReviewsCriteria;
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
            .resourceType(requestCriteria.getResourceType())
            .searchUrl(requestCriteria.getSearchUrl())
            .minRating(requestCriteria.getMinRating())
            .maxRating(requestCriteria.getMaxRating())
            .sortingField(requestCriteria.getSortingField())
            .sortDirection(requestCriteria.getSortDirection())
            .build();
    }
}
