package com.responser.backend.converter;

import com.responser.backend.controller.page.payload.PageInfoDTO;
import com.responser.backend.controller.page.payload.PageDTO;
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

    public Page toPage(PageInfoDTO pageInfoDTO) {
        Page page = new Page();
        page.setUrl(UrlUtils.prepareUrl(pageInfoDTO.getUrl()));
        page.setName(pageInfoDTO.getName());
        page.setDescription(pageInfoDTO.getDescription());

        //TODO: review of this workaround!
        Domain proxyDomain = new Domain();
        proxyDomain.setId(pageInfoDTO.getDomainId());

        page.setDomain(proxyDomain);

        return page;
    }

    public PageDTO toPagePayload(Page page) {
        return PageDTO.builder()
                .id(page.getId())
                .url(page.getUrl())
                .name(page.getName())
                .description(page.getDescription())
                .domain(domainConverter.toDomainPayload(page.getDomain()))
                .build();
    }
}
