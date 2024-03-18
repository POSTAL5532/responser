package space.reviewly.backend.model;

import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WebResourceCriteria {

    private ResourceType resourceType;

    private String searchUrl;

    private Boolean withReviews;

    private Integer maxRating;

    private Integer minRating;

    private WebResourceCriteriaSortingField sortingField;

    private Sort.Direction sortDirection;

    public boolean hasResourceType() {
        return Objects.nonNull(resourceType);
    }

    public boolean hasSearchUrl() {
        return StringUtils.isNotBlank(searchUrl);
    }

    public boolean hasWithReviews() {
        return Objects.nonNull(withReviews);
    }

    public boolean hasMaxRating() {
        return Objects.nonNull(maxRating);
    }

    public boolean hasMinRating() {
        return Objects.nonNull(minRating);
    }

    public boolean hasRatingRange() {
        return hasMaxRating() || hasMinRating();
    }

    public boolean hasSortingField() {
        return Objects.nonNull(sortingField);
    }

    public boolean hasSortingDirection() {
        return Objects.nonNull(sortDirection);
    }
}
