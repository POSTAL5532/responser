package com.responser.backend.controller.domain.payload;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * CreateDomainPayload
 *
 * @author SIE
 */
//TODO: Validation
@Data
@NoArgsConstructor
public class CreateDomainPayload {

    @NotBlank(message = "URL must be specified")
    @Size(min = 10, message = "URL must be from 5 characters")
    private String url;

    private String description;
}
