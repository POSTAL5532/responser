package space.reviewly.backend.converter;

import space.reviewly.backend.controller.webresource.payload.NewWebResourceDTO;
import space.reviewly.backend.controller.webresource.payload.WebResourceDTO;
import space.reviewly.backend.model.webresource.ResourceRating;
import space.reviewly.backend.model.webresource.ResourceType;
import space.reviewly.backend.model.webresource.WebResource;
import space.reviewly.backend.utils.UrlUtils;
import java.util.Objects;
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
            .iconFileName(webResource.getIconFileName())
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
            .iconFileName(webResource.getIconFileName())
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
        webResource.setParentId(newWebResourceDTO.getParentId());

        return webResource;
    }
}
