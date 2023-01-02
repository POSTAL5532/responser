package com.responser.backend.converter;

import com.responser.backend.controller.domain.payload.DomainInfoDTO;
import com.responser.backend.controller.domain.payload.DomainDTO;
import com.responser.backend.model.Domain;
import com.responser.backend.utils.UrlUtils;
import org.springframework.stereotype.Service;

import java.net.URL;

/**
 * {@link Domain}, {@link DomainDTO}, {@link DomainInfoDTO} converter.
 *
 * @author Shcherbachenya Igor
 */
@Service
public class DomainConverter {

    public Domain toDomain(DomainInfoDTO domainPayload) {
        URL url = UrlUtils.convertToURL(UrlUtils.prepareUrl(domainPayload.getUrl()));

        Domain domain = new Domain();
        domain.setDomain(url.getHost());
        domain.setName(url.getHost());
        domain.setDescription(domainPayload.getDescription());
        domain.setHasSsl(UrlUtils.haveSsl(url));

        return domain;
    }

    public DomainDTO toDomainPayload(Domain domain) {
        return DomainDTO.builder()
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
