package com.responser.backend.controller.domain.payload;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Domain info DTO. Uses for creation and updating {@link com.responser.backend.model.Domain} by API
 *
 * @author Shcherbachenya Igor
 */
@Data
@NoArgsConstructor
public class DomainInfoDTO {

    @NotBlank(message = "URL must be specified")
    @Size(min = 10, message = "URL must be from 5 characters")
    private String url;

    private String description;
}
