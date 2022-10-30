package com.responser.backend.controller.resource.payload;

import com.responser.backend.controller.domain.payload.DomainPayload;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * ResourcePayload
 *
 * @author SIE
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourcePayload {

    private String id;

    private DomainPayload domain;

    private String url;

    private String name;

    private String description;

    private LocalDateTime creationDate;

    private LocalDateTime updateDate;
}
