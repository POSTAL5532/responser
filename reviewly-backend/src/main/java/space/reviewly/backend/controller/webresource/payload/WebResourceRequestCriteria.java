package space.reviewly.backend.controller.webresource.payload;

import space.reviewly.backend.model.webresource.ResourceType;
import space.reviewly.backend.model.webresource.WebResourceCriteriaSortingField;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.util.Objects;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;

@Data
public class WebResourceRequestCriteria {

    private ResourceType resourceType;

    private String searchUrl;

    private Boolean withReviews;

    @Max(5)
    @Min(1)
    private Integer maxRating;

    @Max(5)
    @Min(1)
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
        return StringUtils.isNotBlank(searchUrl);
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

    public boolean hasSortDirection() {
        return Objects.nonNull(sortDirection);
    }
}
