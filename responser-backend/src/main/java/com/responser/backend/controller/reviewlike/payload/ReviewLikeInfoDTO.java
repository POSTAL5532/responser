package com.responser.backend.controller.reviewlike.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewLikeInfoDTO {

    @NotBlank(message = "reviewId must be specified")
    private String reviewId;

    @NotNull(message = "positive must be specified")
    private Boolean positive;
}
