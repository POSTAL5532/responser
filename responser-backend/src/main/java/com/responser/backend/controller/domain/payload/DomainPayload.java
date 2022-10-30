package com.responser.backend.controller.domain.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DomainPayload
 *
 * @author SIE
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DomainPayload {

    private String id;

    private String domain;

    private String name;

    private String description;

    private Boolean hasSsl;

    private LocalDateTime creationDate;

    private LocalDateTime updateDate;
}
