package com.responser.backend.converter;

import com.responser.backend.controller.domain.payload.CreateDomainPayload;
import com.responser.backend.controller.domain.payload.DomainPayload;
import com.responser.backend.model.Domain;
import com.responser.backend.utils.UrlUtils;
import org.springframework.stereotype.Service;

import java.net.URL;

/**
 * DomainConverter
 *
 * @author SIE
 */
@Service
public class DomainConverter {

    public Domain toDomain(CreateDomainPayload domainPayload) {
        URL url = UrlUtils.convertToURL(domainPayload.getUrl());

        Domain domain = new Domain();
        domain.setDomain(url.getHost());
        domain.setName(url.getHost());
        domain.setDescription(domainPayload.getDescription());
        domain.setHasSsl(UrlUtils.haveSsl(url));

        return domain;
    }

    public DomainPayload toDomainPayload(Domain domain) {
        return DomainPayload.builder()
                .id(domain.getId())
                .domain(domain.getDomain())
                .name(domain.getName())
                .description(domain.getDescription())
                .hasSsl(domain.getHasSsl())
                .creationDate(domain.getCreationDate())
                .updateDate(domain.getUpdateDate())
                .build();
    }
}
