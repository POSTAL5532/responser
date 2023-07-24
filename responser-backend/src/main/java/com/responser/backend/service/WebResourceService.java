package com.responser.backend.service;

import static java.text.MessageFormat.format;

import com.responser.backend.model.ResourceType;
import com.responser.backend.model.WebResource;
import com.responser.backend.repository.WebResourceRepository;
import com.responser.backend.utils.UrlUtils;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class WebResourceService {

    private final WebResourceRepository webResourceRepository;

    public WebResource getById(String id) {
        return webResourceRepository.findById(id).orElseThrow(() -> {
            log.error("Web resource with id {} doesn't exist", id);
            return new NoSuchElementException(format("Web resource with id {0} doesn't exist", id));
        });
    }

    public WebResource getByUrl(String rawUrl, ResourceType resourceType) {
        String preparedUrl = UrlUtils.prepareUrlByResourceType(rawUrl, resourceType);

        return webResourceRepository
            .findByUrlAndResourceType(preparedUrl, resourceType)
            .orElseThrow(() -> {
                log.error("{} for url {} doesn't exist", resourceType, rawUrl);
                return new NoSuchElementException(format("{0} for url {1} doesn't exist", resourceType, rawUrl));
            });
    }

    public Page<WebResource> getSitesWithReviews(Pageable pageable) {
        return webResourceRepository.findWithReviewsByResourceType(ResourceType.SITE, pageable);
    }

    @Transactional
    public WebResource createWebResource(WebResource newWebResource) {
        ResourceType resourceType = newWebResource.getResourceType();

        if (existByUrl(newWebResource.getUrl(), resourceType)) {
            throw new IllegalArgumentException(
                format("{0} with url {1} already exist", resourceType, newWebResource.getUrl())
            );
        }

        return switch (resourceType) {
            case SITE -> createSiteWebResource(newWebResource);
            case PAGE -> createPageWebResource(newWebResource);
        };
    }

    public WebResource createPageWebResource(WebResource newWebResource) {
        WebResource parent = newWebResource.getParent();

        if (ObjectUtils.isEmpty(parent)) {
            throw new IllegalArgumentException("Page can't be created without parent SITE.");
        }

        WebResource parentSiteResource = getById(parent.getId());
        if (parentSiteResource.getResourceType() != ResourceType.SITE) {
            throw new IllegalArgumentException("Parent must be a SITE type.");
        }

        return webResourceRepository.save(newWebResource);
    }

    public WebResource createSiteWebResource(WebResource newWebResource) {
        ResourceType resourceType = newWebResource.getResourceType();
        WebResource parent = newWebResource.getParent();

        if (resourceType == ResourceType.SITE && ObjectUtils.isNotEmpty(parent)) {
            throw new IllegalArgumentException("Site can't have a parent.");
        }

        return webResourceRepository.save(newWebResource);
    }

    public Boolean existByUrl(String rawUrl, ResourceType resourceType) {
        String preparedUrl = UrlUtils.prepareUrlByResourceType(rawUrl, resourceType);
        return webResourceRepository.existsByUrlAndResourceType(preparedUrl, resourceType);
    }

    public Boolean existById(String id) {
        return webResourceRepository.existsById(id);
    }
}
