package com.responser.backend.model;

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
public class ReviewsCriteria {

    private String resourceId;

    private String excludeUserId;

    private String forUserId;

    private ResourceType resourceType;

    private Integer maxRating;

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
