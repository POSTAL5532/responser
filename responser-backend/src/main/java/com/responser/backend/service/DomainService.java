package com.responser.backend.service;

import com.responser.backend.exceptions.DomainNotFoundException;
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
 * DomainService
 *
 * @author SIE
 */
@AllArgsConstructor
@Service
@Transactional(readOnly = true)
public class DomainService {

    private final DomainRepository domainRepository;

    public Domain getByUrl(String rawUrl) {
        URL url = UrlUtils.convertToURL(rawUrl);
        return domainRepository
                .findByDomain(url.getHost())
                .orElseThrow(() -> new DomainNotFoundException(MessageFormat.format(
                        "Domain for url ''{0}'' doesn't exist",
                        rawUrl
                )));
    }

    public Domain getByUrl(URL url) {
        return domainRepository
                .findByDomain(url.getHost())
                .orElseThrow(() -> new DomainNotFoundException(MessageFormat.format(
                        "Domain for url ''{0}'' doesn't exist",
                        url.toString()
                )));
    }
}
