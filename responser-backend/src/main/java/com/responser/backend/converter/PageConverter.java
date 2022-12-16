package com.responser.backend.converter;

import com.responser.backend.controller.page.payload.CreatePagePayload;
import com.responser.backend.controller.page.payload.PagePayload;
import com.responser.backend.model.Domain;
import com.responser.backend.model.Page;
import com.responser.backend.utils.UrlUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * PageConverter
 *
 * @author SIE
 */
@RequiredArgsConstructor
@Service
public class PageConverter {

    private final DomainConverter domainConverter;

    public Page toPage(CreatePagePayload createPagePayload) {
        Page page = new Page();
        page.setUrl(UrlUtils.prepareUrl(createPagePayload.getUrl()));
        page.setName(createPagePayload.getName());
        page.setDescription(createPagePayload.getDescription());

        //TODO: review of this workaround!
        Domain proxyDomain = new Domain();
        proxyDomain.setId(createPagePayload.getDomainId());

        page.setDomain(proxyDomain);

        return page;
    }

    public PagePayload toPagePayload(Page page) {
        return PagePayload.builder()
                .id(page.getId())
                .url(page.getUrl())
                .name(page.getName())
                .description(page.getDescription())
                .domain(domainConverter.toDomainPayload(page.getDomain()))
                .build();
    }
}
