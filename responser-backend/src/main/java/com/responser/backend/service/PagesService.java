package com.responser.backend.service;

import com.responser.backend.model.Domain;
import com.responser.backend.model.Page;
import com.responser.backend.repository.PagesRepository;
import com.responser.backend.utils.UrlUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static java.text.MessageFormat.format;
import java.util.NoSuchElementException;

/**
 * Pages service.
 *
 * @author Shcherbachenya Igor
 */
@Slf4j
@AllArgsConstructor
@Service
@Transactional(readOnly = true)
public class PagesService {

    private final PagesRepository pagesRepository;

    private final DomainService domainService;

    public Page getByUrl(String rawUrl) {
        return pagesRepository
            .findByUrl(rawUrl)
            .orElseThrow(() -> {
                log.error("Page with url {} doesn't exist", rawUrl);
                return new NoSuchElementException(format("Page with url ''{0}'' doesn't exist", rawUrl));
            });
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
            log.error("Page host {} and domain host {} doesn't equals.", newPage.getUrl(), domain.getDomain());
            throw new IllegalArgumentException(
                format("Page host ''{0}'' and domain host ''{1}'' doesn't equals.", newPage.getUrl(), domain.getDomain())
            );
        }

        newPage.setDomain(domain);
        return pagesRepository.save(newPage);
    }

    public Boolean existsById(String id) {
        return pagesRepository.existsById(id);
    }

    public Double getPageRating(String domainId) {
        return pagesRepository.commonRating(domainId);
    }
}
