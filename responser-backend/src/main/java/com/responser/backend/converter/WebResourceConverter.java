package com.responser.backend.converter;

import com.responser.backend.controller.webresource.payload.NewWebResourceDTO;
import com.responser.backend.controller.webresource.payload.WebResourceDTO;
import com.responser.backend.model.ResourceType;
import com.responser.backend.model.WebResource;
import com.responser.backend.utils.UrlUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

@Service
public class WebResourceConverter {

    public WebResourceDTO toDTO(WebResource webResource) {
        return WebResourceDTO.builder()
            .id(webResource.getId())
            .url(webResource.getUrl())
            .parent(toDTO(webResource.getParent()))
            .creationDate(webResource.getCreationDate())
            .updateDate(webResource.getUpdateDate())
            .build();
    }

    public WebResource toEntity(NewWebResourceDTO newWebResourceDTO) {
        WebResource webResource = new WebResource();

        webResource.setResourceType(newWebResourceDTO.getResourceType());


        String rawUrl = newWebResourceDTO.getUrl();
        ResourceType resourceType = newWebResourceDTO.getResourceType();
        String url = switch (resourceType) {
            case PAGE -> UrlUtils.prepareUrl(rawUrl);
            case SITE -> UrlUtils.prepareSiteUrl(rawUrl);
            default -> throw new IllegalArgumentException("Bad url: " + rawUrl);
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
