package com.responser.backend.service;

import com.responser.backend.model.Domain;
import com.responser.backend.repository.DomainRepository;
import com.responser.backend.utils.UrlUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URL;
import static java.text.MessageFormat.format;
import java.util.NoSuchElementException;

/**
 * Domain service
 *
 * @author Shcherbachenya Igor
 */
@Slf4j
@AllArgsConstructor
@Service
@Transactional(readOnly = true)
public class DomainService {

    private final DomainRepository domainRepository;

    public Domain getById(String id) {
        return domainRepository.findById(id).orElseThrow(() -> {
            log.error("Domain with id {} doesn't exist", id);
            return new NoSuchElementException(format("Domain with id ''{0}'' doesn't exist", id));
        });
    }

    public Domain getByUrl(String url) {
        return this.getByUrl(UrlUtils.convertToURL(url));
    }

    public Domain getByUrl(URL url) {
        return domainRepository
            .findByDomain(url.getHost())
            .orElseThrow(() -> {
                log.error("Domain for url {} doesn't exist", url);
                return new NoSuchElementException(format("Domain for url ''{0}'' doesn't exist", url.toString()));
            });
    }

    @Transactional
    public Domain createDomain(Domain newDomain) {
        return domainRepository.save(newDomain);
    }

    public Boolean existsById(String id) {
        return domainRepository.existsById(id);
    }

    public Double getDomainRating(String domainId) {
        return domainRepository.commonRating(domainId);
    }

    public Double getDomainRatingByUrl(String url) {
        Domain domain = getByUrl(UrlUtils.convertToURL(url));
        return domainRepository.commonRating(domain.getId());
    }
}
