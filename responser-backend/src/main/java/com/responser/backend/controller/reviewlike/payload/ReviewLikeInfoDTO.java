package com.responser.backend.controller.reviewlike.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewLikeInfoDTO {

    @NotBlank
    private String reviewId;

    @NotNull
    private Boolean positive;
}
