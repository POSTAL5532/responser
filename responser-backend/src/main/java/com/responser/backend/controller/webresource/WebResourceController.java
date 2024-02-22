package com.responser.backend.controller.webresource;

import com.responser.backend.controller.reviews.payload.ReviewsRequestCriteria;
import com.responser.backend.controller.webresource.payload.WebResourceDTO;
import com.responser.backend.controller.webresource.payload.WebResourceRequestCriteria;
import com.responser.backend.converter.ReviewConverter;
import com.responser.backend.converter.ReviewsCriteriaConverter;
import com.responser.backend.converter.WebResourceConverter;
import com.responser.backend.converter.WebResourceCriteriaConverter;
import com.responser.backend.model.AbstractEntity;
import com.responser.backend.model.ResourceRating;
import com.responser.backend.model.ResourceType;
import com.responser.backend.model.Review;
import com.responser.backend.model.ReviewsCriteriaResourceType;
import com.responser.backend.model.ReviewsCriteriaSortingField;
import com.responser.backend.model.WebResource;
import com.responser.backend.model.WebResourceCriteriaSortingField;
import com.responser.backend.service.RatingService;
import com.responser.backend.service.webResource.WebResourceService;
import com.responser.backend.service.review.ReviewService;
import com.responser.backend.utils.UrlUtils;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequiredArgsConstructor
@Controller
@RequestMapping(WebResourceController.WEB_RESOURCES_URL)
public class WebResourceController {

    public static final String WEB_RESOURCES_URL = "/web-resources";
    public static final String SITES_RATING_URL = "/sites-rating";

    private final WebResourceConverter webResourceConverter;
    private final WebResourceService webResourceService;
    private final RatingService ratingService;
    private final ReviewService reviewService;
    private final WebResourceCriteriaConverter criteriaConverter;
    private final ReviewsCriteriaConverter reviewsCriteriaConverter;
    private final ReviewConverter reviewConverter;

    @GetMapping(SITES_RATING_URL)
    public String getSitesRatingPage(
        Model model,
        @Valid @NotNull WebResourceRequestCriteria criteria,
        @RequestParam(required = false, defaultValue = "0") Integer page
    ) {
        criteria.setResourceType(ResourceType.SITE);
        criteria.setWithReviews(true);

        if(criteria.hasSearchUrl()) {
            criteria.setSearchUrl(UrlUtils.prepareSiteUrl(criteria.getSearchUrl()));
        }

        if (!criteria.hasSortingField()) {
            criteria.setSortingField(WebResourceCriteriaSortingField.CREATION_DATE);
            criteria.setSortDirection(Direction.DESC);
        }

        Page<WebResource> webResourcesPage = webResourceService.getWebResources(
            criteriaConverter.toWebResourceCriteria(criteria),
            PageRequest.of(page, 10)
        );

        List<String> ids = webResourcesPage.getContent().stream().map(AbstractEntity::getId).toList();

        Map<String, ResourceRating> ratings = ratingService.getWebResourcesRatings(ids).stream()
            .collect(Collectors.toMap(ResourceRating::getResourceId, Function.identity()));

        List<WebResourceDTO> webResourceDTOS = webResourcesPage.getContent().stream().map(webResource -> {
            WebResourceDTO dto = webResourceConverter.toDTO(webResource);
            ResourceRating rating = ratings.get(webResource.getId());

            dto.setRating(rating.getRating());
            dto.setReviewsCount(rating.getReviewsCount());

            return dto;
        }).toList();

        model.addAttribute("criteria", criteria);
        model.addAttribute("sites", webResourceDTOS);

        // TODO: Refactor to Page<>, without redundant attributes
        model.addAttribute("previousPageNumber", webResourcesPage.hasPrevious() ? webResourcesPage.getNumber() - 1 : null);
        model.addAttribute("nextPageNumber", webResourcesPage.hasNext() ? webResourcesPage.getNumber() + 1 : null);

        return "sitesRating";
    }

    @GetMapping("/{resourceId}")
    public String getWebResourceDetailsPage(
        Model model,
        @PathVariable String resourceId,
        @RequestParam(required = false, defaultValue = "0") Integer page,
        @Valid @NotNull ReviewsRequestCriteria reviewsCriteria
    ) {
        reviewsCriteria.setResourceId(resourceId);

        if (!reviewsCriteria.hasSortingField()) {
            reviewsCriteria.setSortingField(ReviewsCriteriaSortingField.CREATION_DATE);
            reviewsCriteria.setSortDirection(Direction.DESC);
        }

        if (!reviewsCriteria.hasResourceType()) {
            reviewsCriteria.setResourceType(ReviewsCriteriaResourceType.ALL);
        }

        WebResource webResource = webResourceService.getById(resourceId);
        ResourceRating resourceRating = ratingService.getResourceFullRatingById(webResource.getId());

        Page<Review> reviews = reviewService.getReviews(
            reviewsCriteriaConverter.toReviewsCriteria(reviewsCriteria),
            PageRequest.of(page, 10)
        );

        WebResourceDTO webResourceDTO = webResourceConverter.toDTO(webResource);
        webResourceDTO.setRating(resourceRating.getRating());
        webResourceDTO.setReviewsCount(resourceRating.getReviewsCount());

        model.addAttribute("reviewsCriteria", reviewsCriteria);
        model.addAttribute("webResource", webResourceDTO);
        model.addAttribute("reviews", reviewConverter.toPageableReviewPayloadList(reviews));

        // TODO: Refactor to Page<>, without redundant attributes
        model.addAttribute("previousPageNumber", reviews.hasPrevious() ? reviews.getNumber() - 1 : null);
        model.addAttribute("nextPageNumber", reviews.hasNext() ? reviews.getNumber() + 1 : null);

        return "webResourceDetails";
    }
}
