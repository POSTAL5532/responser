package com.responser.backend.controller.page.payload;

import com.responser.backend.controller.domain.payload.DomainPayload;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * PagePayload
 *
 * @author SIE
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PagePayload {

    private String id;

    private DomainPayload domain;

    private String url;

    private String name;

    private String description;

    private LocalDateTime creationDate;

    private LocalDateTime updateDate;
}
