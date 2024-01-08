package com.responser.backend.controller.reviews.payload;

import com.responser.backend.model.ReviewsCriteriaResourceType;
import com.responser.backend.model.ReviewsCriteriaSortingField;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.util.Objects;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;
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

    private ReviewsCriteriaResourceType resourceType;

    private String searchUrl;

    @Max(5)
    @Min(0)
    private Integer maxRating;

    @Max(5)
    @Min(0)
    private Integer minRating;

    private ReviewsCriteriaSortingField sortingField;

    private Sort.Direction sortDirection;

    public boolean hasResourceId() {
        return StringUtils.isNotBlank(resourceId);
    }

    public boolean hasExcludeUserId() {
        return StringUtils.isNotBlank(excludeUserId);
    }

    public boolean hasForUserId() {
        return StringUtils.isNotBlank(forUserId);
    }

    public boolean hasResourceType() {
        return Objects.nonNull(resourceType);
    }

    public boolean hasSearchUrl() {
        return StringUtils.isNotBlank(searchUrl);
    }

    public boolean hasMaxRating() {
        return Objects.nonNull(maxRating);
    }

    public boolean hasMinRating() {
        return Objects.nonNull(minRating);
    }

    public boolean hasSortingField() {
        return Objects.nonNull(sortingField);
    }

    public boolean hasSortDirection() {
        return Objects.nonNull(sortDirection);
    }
}
