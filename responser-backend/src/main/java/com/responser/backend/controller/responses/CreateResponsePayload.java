package com.responser.backend.controller.responses;

import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.*;

/**
 * CreateResponsePayload
 *
 * @author SIE
 */
public class CreateResponsePayload {

    @NotBlank
    @URL
    private String url;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer rating;

    @NotBlank
    @Size(min = 1, max = 450)
    private String text;
}
