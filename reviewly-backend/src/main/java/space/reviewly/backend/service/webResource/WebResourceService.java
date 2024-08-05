package space.reviewly.backend.service.webResource;

import static java.text.MessageFormat.format;

import org.springframework.web.multipart.MultipartFile;
import space.reviewly.backend.model.webresource.ResourceType;
import space.reviewly.backend.model.webresource.WebResource;
import space.reviewly.backend.model.webresource.WebResourceCriteria;
import space.reviewly.backend.repository.WebResourceRepository;
import space.reviewly.backend.service.fileResource.FileResourceType;
import space.reviewly.backend.service.fileResource.S3FileResourceService;
import space.reviewly.backend.utils.SiteIconUtil;
import space.reviewly.backend.utils.TikaWrapper;
import space.reviewly.backend.utils.UrlUtils;
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

    private final S3FileResourceService s3FileResourceService;

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
    public WebResource createWebResource(WebResource newWebResource, MultipartFile siteIcon) {
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
        String parentId = newWebResource.getParentId();

        if (StringUtils.isBlank(parentId)) {
            throw new IllegalArgumentException("Page can't be created without SITE parent.");
        }

        if (newWebResource.getResourceType() != ResourceType.PAGE) {
            throw new IllegalArgumentException("Page web resource must have a PAGE resource type.");
        }

        WebResource parentSiteResource = getById(parentId);
        if (parentSiteResource.getResourceType() != ResourceType.SITE) {
            throw new IllegalArgumentException("Parent must be a SITE type.");
        }

        return webResourceRepository.save(newWebResource);
    }

    public WebResource createSiteWebResource(WebResource newWebResource, MultipartFile siteIcon) {
        ResourceType resourceType = newWebResource.getResourceType();
        WebResource parent = newWebResource.getParent();

        if (resourceType != ResourceType.SITE) {
            throw new IllegalArgumentException("Site web resource must have a SITE resource type.");
        } else if (ObjectUtils.isNotEmpty(parent)) {
            throw new IllegalArgumentException("Site can't have a parent.");
        }

        try {
            byte[] iconBytes = ObjectUtils.isNotEmpty(siteIcon)
                ? siteIcon.getBytes()
                : SiteIconUtil.downloadSiteIcon(newWebResource.getUrl());

            if (ObjectUtils.isNotEmpty(iconBytes)) {
                String iconType = new TikaWrapper().detectExtension(iconBytes);
                String iconFileName = FileResourceType.generateSiteIconFileName(iconType);
                s3FileResourceService.uploadSiteIcon(iconBytes, iconFileName);
                newWebResource.setIconFileName(iconFileName);

            }
        } catch (Exception e) {
            log.warn("Can't add site icon for new site: {}.", newWebResource.getUrl(), e);
            log.warn(StringUtils.EMPTY, e);
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
