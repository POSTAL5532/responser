package com.responser.backend.service;

import com.responser.backend.exceptions.ResourceNotFoundException;
import com.responser.backend.model.Domain;
import com.responser.backend.model.Resource;
import com.responser.backend.repository.ResourceRepository;
import com.responser.backend.utils.UrlUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.text.MessageFormat;
import java.util.NoSuchElementException;

/**
 * ResourcesService
 *
 * @author SIE
 */
@AllArgsConstructor
@Service
@Transactional(readOnly = true)
public class ResourcesService {

    private final ResourceRepository resourceRepository;

    private final DomainService domainService;

    public Resource getByUrl(String rawUrl) {
        Domain domain = domainService.getByUrl(UrlUtils.convertToURL(rawUrl));

        return resourceRepository
                .findByDomainIdAndUrl(domain.getId(), rawUrl)
                .orElseThrow(() -> new ResourceNotFoundException(MessageFormat.format(
                        "Resource with id \"{0}\" and url \"{1}\" doesn't exist",
                        domain.getId(),
                        rawUrl)
                ));
    }
}
