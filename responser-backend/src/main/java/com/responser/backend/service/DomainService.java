package com.responser.backend.service;

import com.responser.backend.model.Domain;
import com.responser.backend.repository.DomainRepository;
import com.responser.backend.utils.UrlUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URL;
import java.text.MessageFormat;
import java.util.NoSuchElementException;

/**
 * Domain service
 *
 * @author Shcherbachenya Igor
 */
@AllArgsConstructor
@Service
@Transactional(readOnly = true)
public class DomainService {

    private final DomainRepository domainRepository;

    public Domain getById(String id) {
        return domainRepository.findById(id).orElseThrow(() -> new NoSuchElementException(
            MessageFormat.format("Domain with id \"{0}\" doesn't exist", id)
        ));
    }

    public Domain getByUrl(String url) {
        return this.getByUrl(UrlUtils.convertToURL(url));
    }

    public Domain getByUrl(URL url) {
        return domainRepository
            .findByDomain(url.getHost())
            .orElseThrow(() -> new NoSuchElementException(
                MessageFormat.format("Domain for url \"{0}\" doesn't exist", url.toString())
            ));
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
}
