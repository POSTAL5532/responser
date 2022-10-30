package com.responser.backend.service;

import com.responser.backend.controller.resource.payload.CreateResourcePayload;
import com.responser.backend.exceptions.ResourceNotFoundException;
import com.responser.backend.model.Domain;
import com.responser.backend.model.Resource;
import com.responser.backend.repository.ResourceRepository;
import com.responser.backend.utils.UrlUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.net.URL;
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
        return resourceRepository
                .findByUrl(rawUrl)
                .orElseThrow(() -> new ResourceNotFoundException(
                        MessageFormat.format("Resource with url \"{0}\" doesn't exist", rawUrl)
                ));
    }

    @Transactional
    public Resource createResource(Resource newResource) {
        Domain domain = domainService.getById(newResource.getDomain().getId());

        if (!resourceUrlEqualsDomain(newResource, domain)) {
            throw new IllegalArgumentException(
                    MessageFormat.format(
                            "Resource host {0} and domain host {1} doesn't equals.",
                            newResource.getUrl(),
                            domain.getDomain()
                    )
            );
        }

        newResource.setDomain(domain);
        return resourceRepository.save(newResource);
    }

    public static boolean resourceUrlEqualsDomain(Resource resource, Domain domain) {
        String resourceDomain = UrlUtils.convertToURL(resource.getUrl()).getHost();
        return resourceDomain.equals(domain.getDomain());
    }
}
