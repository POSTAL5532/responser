package com.responser.backend.converter;

import com.responser.backend.controller.webresource.payload.NewWebResourceDTO;
import com.responser.backend.controller.webresource.payload.WebResourceDTO;
import com.responser.backend.model.ResourceRating;
import com.responser.backend.model.ResourceType;
import com.responser.backend.model.WebResource;
import com.responser.backend.utils.UrlUtils;
import java.util.Objects;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

@Service
public class WebResourceConverter {

    public WebResourceDTO toDTO(WebResource webResource) {
        if (Objects.isNull(webResource)) {
            return null;
        }

        return WebResourceDTO.builder()
            .id(webResource.getId())
            .url(webResource.getUrl())
            .parent(toDTO(webResource.getParent()))
            .resourceType(webResource.getResourceType())
            .creationDate(webResource.getCreationDate())
            .updateDate(webResource.getUpdateDate())
            .build();
    }

    public WebResourceDTO toDTO(WebResource webResource, ResourceRating resourceRating) {
        if (Objects.isNull(webResource)) {
            return null;
        }

        WebResourceDTO.WebResourceDTOBuilder builder = WebResourceDTO.builder()
            .id(webResource.getId())
            .url(webResource.getUrl())
            .parent(toDTO(webResource.getParent()))
            .resourceType(webResource.getResourceType())
            .creationDate(webResource.getCreationDate())
            .updateDate(webResource.getUpdateDate());

        if (Objects.nonNull(resourceRating)) {
            builder.rating(resourceRating.getRating()).reviewsCount(resourceRating.getReviewsCount());
        }

        return builder.build();
    }

    public WebResource toEntity(NewWebResourceDTO newWebResourceDTO) {
        WebResource webResource = new WebResource();

        webResource.setResourceType(newWebResourceDTO.getResourceType());

        String rawUrl = newWebResourceDTO.getUrl();
        ResourceType resourceType = newWebResourceDTO.getResourceType();
        String url = switch (resourceType) {
            case PAGE -> UrlUtils.preparePageUrl(rawUrl);
            case SITE -> UrlUtils.prepareSiteUrl(rawUrl);
        };

        webResource.setUrl(url);

        String parentId = newWebResourceDTO.getParentId();
        if (StringUtils.isNotBlank(parentId)) {
            WebResource proxyParent = new WebResource();
            proxyParent.setId(newWebResourceDTO.getParentId());
            webResource.setParent(proxyParent);
        }

        return webResource;
    }
}
