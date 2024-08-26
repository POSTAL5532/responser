package space.reviewly.backend;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponentsBuilder;
import space.reviewly.backend.controller.reviews.payload.ReviewsRequestCriteria;
import space.reviewly.backend.controller.webresource.payload.WebResourceRequestCriteria;

public class PaginationUtils {

    public static String createWebResourcesListPageLink(WebResourceRequestCriteria criteria, Integer page) {
        UriComponentsBuilder builder = ServletUriComponentsBuilder.fromCurrentRequestUri();

        builder.replaceQueryParam("searchUrl", criteria.getSearchUrl())
            .replaceQueryParam("maxRating", criteria.getMaxRating())
            .replaceQueryParam("minRating", criteria.getMinRating())
            .replaceQueryParam("sortingField", criteria.getSortingField())
            .replaceQueryParam("sortDirection", criteria.getSortDirection())
            .replaceQueryParam("page", page);

        return builder.toUriString();
    }

    public static String createReviewsListPageLink(ReviewsRequestCriteria criteria, Integer page) {
        UriComponentsBuilder builder = ServletUriComponentsBuilder.fromCurrentRequestUri();

        builder.replaceQueryParam("resourceType", criteria.getResourceType())
            .replaceQueryParam("searchUrl", criteria.getSearchUrl())
            .replaceQueryParam("maxRating", criteria.getMaxRating())
            .replaceQueryParam("minRating", criteria.getMinRating())
            .replaceQueryParam("sortingField", criteria.getSortingField())
            .replaceQueryParam("sortDirection", criteria.getSortDirection())
            .replaceQueryParam("page", page);

        return builder.toUriString();
    }
}
