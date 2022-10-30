package com.responser.backend.controller.resource.payload;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * CreateResourcePayload
 *
 * @author SIE
 */
//TODO: Need validation upgrading
@Data
@NoArgsConstructor
public class CreateResourcePayload {

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
