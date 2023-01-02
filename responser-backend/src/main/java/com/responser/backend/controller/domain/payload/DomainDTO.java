package com.responser.backend.controller.domain.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Domain DTO payload.
 *
 * @author Shcherbachenya Igor
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DomainDTO {

    private String id;

    private String domain;

    private String name;

    private String description;

    private Boolean hasSsl;

    private LocalDateTime creationDate;

    private LocalDateTime updateDate;
}
