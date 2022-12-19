package com.responser.backend.service;

import com.responser.backend.model.Domain;
import com.responser.backend.model.Page;
import com.responser.backend.repository.PagesRepository;
import com.responser.backend.utils.UrlUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.MessageFormat;
import java.util.NoSuchElementException;

/**
 * PagesService
 *
 * @author SIE
 */
@AllArgsConstructor
@Service
@Transactional(readOnly = true)
public class PagesService {

    private final PagesRepository pagesRepository;

    private final DomainService domainService;

    public Page getByUrl(String rawUrl) {
        return pagesRepository
                .findByUrl(rawUrl)
                .orElseThrow(() -> new NoSuchElementException(
                        MessageFormat.format("Page with url \"{0}\" doesn't exist", rawUrl)
                ));
    }

    @Transactional
    public Page createPage(Page newPage) {
        Domain domain = domainService.getById(newPage.getDomain().getId());

        if (!pageUrlEqualsDomain(newPage, domain)) {
            throw new IllegalArgumentException(
                    MessageFormat.format(
                            "Page host {0} and domain host {1} doesn't equals.",
                            newPage.getUrl(),
                            domain.getDomain()
                    )
            );
        }

        newPage.setDomain(domain);
        return pagesRepository.save(newPage);
    }

    public static boolean pageUrlEqualsDomain(Page page, Domain domain) {
        String pageDomain = UrlUtils.convertToURL(page.getUrl()).getHost();
        return pageDomain.equals(domain.getDomain());
    }

    public Boolean existsById(String id) {
        return pagesRepository.existsById(id);
    }
}
