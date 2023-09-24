package com.responser.backend.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Sort;

@Data
@Builder
public class ReviewsCriteria {

    private String resourceId;

    private String excludeUserId;

    private String forUserId;

    private ResourceType resourceType;

    private ReviewsCriteriaSortingField sortingField;

    private Sort.Direction sortDirection;
}
