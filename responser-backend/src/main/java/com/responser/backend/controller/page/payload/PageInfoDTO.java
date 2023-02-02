package com.responser.backend.controller.page.payload;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Page info DTO. Uses for creation and updating {@link com.responser.backend.model.Page} by API
 *
 * @author Shcherbachenya Igor
 */
@Data
@NoArgsConstructor
public class PageInfoDTO {

    @NotBlank(message = "Domain id must be specified")
    private String domainId;

    @NotBlank(message = "Url must be specified")
    @Size(min = 10, message = "Url must be from 10 characters")
    private String url;

    private String description;
}
