package com.responser.backend.controller.page.payload;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * CreatePagePayload
 *
 * @author SIE
 */
//TODO: Need validation upgrading
@Data
@NoArgsConstructor
public class CreatePagePayload {

    @NotBlank(message = "Domain id must be specified")
    private String domainId;

    @NotBlank(message = "Domain must be specified")
    @Size(min = 10, message = "Domain must be from 10 characters")
    private String url;

    @NotBlank(message = "Name must be specified")
    @Size(min = 2, max = 255, message = "Name must be from 2 to 255 characters")
    private String name;

    private String description;
}
