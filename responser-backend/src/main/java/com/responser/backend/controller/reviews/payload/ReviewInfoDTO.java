package com.responser.backend.controller.reviews.payload;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.*;

/**
 * ReviewDataPayload
 *
 * @author SIE
 */
@Data
@NoArgsConstructor
public class ReviewInfoDTO {

    @NotBlank
    private String resourceId;

    @NotNull
    @Min(1)
    @Max(5)
    private Byte rating;

    @NotBlank
    @Size(min = 1, max = 450)
    private String text;

    @NotBlank
    private String resourceType;
}
