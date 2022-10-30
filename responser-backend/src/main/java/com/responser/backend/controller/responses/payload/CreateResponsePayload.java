package com.responser.backend.controller.responses.payload;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

/**
 * CreateResponsePayload
 *
 * @author SIE
 */
@Data
@NoArgsConstructor
public class CreateResponsePayload {

    @NotBlank
    private String resourceId;

    @NotNull
    @Min(1)
    @Max(5)
    private Byte rating;

    @NotBlank
    @Size(min = 1, max = 450)
    private String text;
}
