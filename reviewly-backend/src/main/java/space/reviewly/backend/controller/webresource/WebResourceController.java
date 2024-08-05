package space.reviewly.backend.controller.webresource;

import java.util.Optional;
import space.reviewly.backend.controller.reviews.payload.ReviewsRequestCriteria;
import space.reviewly.backend.controller.webresource.payload.WebResourceDTO;
import space.reviewly.backend.controller.webresource.payload.WebResourceRequestCriteria;
import space.reviewly.backend.converter.ReviewConverter;
import space.reviewly.backend.converter.ReviewsCriteriaConverter;
import space.reviewly.backend.converter.WebResourceConverter;
import space.reviewly.backend.converter.WebResourceCriteriaConverter;
import space.reviewly.backend.model.AbstractEntity;
import space.reviewly.backend.model.webresource.ResourceRating;
import space.reviewly.backend.model.webresource.ResourceType;
import space.reviewly.backend.model.review.Review;
import space.reviewly.backend.model.review.ReviewsCriteriaResourceType;
import space.reviewly.backend.model.review.ReviewsCriteriaSortingField;
import space.reviewly.backend.model.webresource.WebResource;
import space.reviewly.backend.model.webresource.WebResourceCriteriaSortingField;
import space.reviewly.backend.service.RatingService;
import space.reviewly.backend.service.webResource.WebResourceService;
import space.reviewly.backend.service.review.ReviewService;
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
        Optional<ResourceRating> resourceRating = Optional.ofNullable(ratingService.getResourceFullRatingById(webResource.getId()));

        Page<Review> reviews = reviewService.getReviews(
            reviewsCriteriaConverter.toReviewsCriteria(reviewsCriteria),
            PageRequest.of(page, 10)
        );

        WebResourceDTO webResourceDTO = webResourceConverter.toDTO(webResource);
        webResourceDTO.setRating(resourceRating.map(ResourceRating::getRating).orElse(null));
        webResourceDTO.setReviewsCount(resourceRating.map(ResourceRating::getReviewsCount).orElse(null));

        model.addAttribute("reviewsCriteria", reviewsCriteria);
        model.addAttribute("webResource", webResourceDTO);
        model.addAttribute("reviews", reviewConverter.toPageableReviewPayloadList(reviews));

        // TODO: Refactor to Page<>, without redundant attributes
        model.addAttribute("previousPageNumber", reviews.hasPrevious() ? reviews.getNumber() - 1 : null);
        model.addAttribute("nextPageNumber", reviews.hasNext() ? reviews.getNumber() + 1 : null);

        return "webResourceDetails";
    }
}
