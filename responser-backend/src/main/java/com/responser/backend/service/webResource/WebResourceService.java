package com.responser.backend.service.webResource;

import static java.text.MessageFormat.format;

import com.responser.backend.model.ResourceType;
import com.responser.backend.model.WebResource;
import com.responser.backend.model.WebResourceCriteria;
import com.responser.backend.repository.WebResourceRepository;
import com.responser.backend.service.fileResource.FileResourceService;
import com.responser.backend.service.fileResource.FileResourceType;
import com.responser.backend.utils.TikaWrapper;
import com.responser.backend.utils.UrlUtils;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
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

    private final FileResourceService fileResourceService;

    public Page<WebResource> getWebResources(WebResourceCriteria criteria, Pageable pageable) {
        return webResourceRepository.findAll(new WebResourceSpecification(criteria), pageable);
    }

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

    @Transactional
    public WebResource createWebResource(WebResource newWebResource, byte[] siteIcon) {
        ResourceType resourceType = newWebResource.getResourceType();

        if (existByUrl(newWebResource.getUrl(), resourceType)) {
            throw new IllegalArgumentException(
                format("{0} with url {1} already exist", resourceType, newWebResource.getUrl())
            );
        }

        return switch (resourceType) {
            case SITE -> createSiteWebResource(newWebResource, siteIcon);
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

    public WebResource createSiteWebResource(WebResource newWebResource, byte[] siteIcon) {
        ResourceType resourceType = newWebResource.getResourceType();
        WebResource parent = newWebResource.getParent();

        if (resourceType != ResourceType.SITE) {
            throw new IllegalArgumentException("Site web resource must have a SITE resource type.");
        } else if (ObjectUtils.isNotEmpty(parent)) {
            throw new IllegalArgumentException("Site can't have a parent.");
        }

        if (ObjectUtils.isNotEmpty(siteIcon)) {
            try {
                String iconType = new TikaWrapper().detect(siteIcon);
                String iconFileName = FileResourceType.generateSiteIconFileName(iconType);
                fileResourceService.uploadSiteIcon(siteIcon, iconFileName);
                newWebResource.setIconFileName(iconFileName);
            } catch (Exception e) {
                log.warn("Can't add site icon for new site: {}.", newWebResource.getUrl());
                log.warn(StringUtils.EMPTY, e);
            }
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
