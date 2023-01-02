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
 * Pages service.
 *
 * @author Shcherbachenya Igor
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

    /**
     * Check relationship between the page and domain and create new {@link Page} entity.
     *
     * @param newPage new page model
     * @return initialized page model
     */
    @Transactional
    public Page createPage(Page newPage) {
        Domain domain = domainService.getById(newPage.getDomain().getId());
        String pageDomain = UrlUtils.convertToURL(newPage.getUrl()).getHost();

        if (!pageDomain.equals(domain.getDomain())) {
            throw new IllegalArgumentException(
                MessageFormat.format(
                    "Page host {0} and domain host {1} doesn't equals.", newPage.getUrl(), domain.getDomain()
                )
            );
        }

        newPage.setDomain(domain);
        return pagesRepository.save(newPage);
    }

    public Boolean existsById(String id) {
        return pagesRepository.existsById(id);
    }
}
