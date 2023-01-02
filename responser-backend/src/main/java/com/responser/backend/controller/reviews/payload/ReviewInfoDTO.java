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

    @NotBlank(message = "resourceId must be specified")
    private String resourceId;

    @NotNull(message = "rating must be specified")
    @Min(value = 1, message = "rating must be in range between 1 and 5")
    @Max(value = 5, message = "rating must be in range between 1 and 5")
    private Byte rating;

    @NotBlank(message = "text must be specified")
    @Size(min = 1, max = 460, message = "text must be in range between 1 and 460")
    private String text;

    @NotBlank(message = "resourceType must be specified")
    private String resourceType;
}
