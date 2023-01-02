package com.responser.backend.controller.page.payload;

import com.responser.backend.controller.domain.payload.DomainDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Page DTO payload.
 *
 * @author Shcherbachenya Igor
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PageDTO {

    private String id;

    private DomainDTO domain;

    private String url;

    private String name;

    private String description;

    private Double rating;

    private LocalDateTime creationDate;

    private LocalDateTime updateDate;
}
