package com.responser.backend.converter;

import com.responser.backend.controller.page.payload.PageInfoDTO;
import com.responser.backend.controller.page.payload.PageDTO;
import com.responser.backend.model.Domain;
import com.responser.backend.model.Page;
import com.responser.backend.utils.UrlUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * {@link Page}, {@link PageDTO}, {@link PageInfoDTO} converter.
 *
 * @author Shcherbachenya Igor
 */
@RequiredArgsConstructor
@Service
public class PageConverter {

    private final DomainConverter domainConverter;

    public Page toPage(PageInfoDTO pageInfoDTO) {
        Page page = new Page();
        page.setUrl(UrlUtils.prepareUrl(pageInfoDTO.getUrl()));

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
            .domain(domainConverter.toDomainPayload(page.getDomain()))
            .build();
    }
}
