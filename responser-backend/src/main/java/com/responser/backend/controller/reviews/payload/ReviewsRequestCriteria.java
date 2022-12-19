package com.responser.backend.controller.reviews.payload;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ReviewsRequestCriteria {

    @NotBlank
    private String resourceId;

    private String excludeUserId;

    private String forUserId;

    private String resourceType;
}
