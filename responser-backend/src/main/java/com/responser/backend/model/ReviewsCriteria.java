package com.responser.backend.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewsCriteria {

    private String resourceId;

    private String excludeUserId;

    private String forUserId;

    private ResourceType resourceType;
}
