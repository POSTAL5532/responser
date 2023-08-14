package com.responser.backend.controller.webresource;

import com.responser.backend.controller.webresource.payload.WebResourceDTO;
import com.responser.backend.converter.WebResourceConverter;
import com.responser.backend.model.AbstractEntity;
import com.responser.backend.model.ResourceRating;
import com.responser.backend.model.Review;
import com.responser.backend.model.ReviewsCriteria;
import com.responser.backend.model.WebResource;
import com.responser.backend.service.RatingService;
import com.responser.backend.service.WebResourceService;
import com.responser.backend.service.review.ReviewService;
import com.responser.backend.utils.UrlUtils;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequiredArgsConstructor
@Controller
@RequestMapping("/web-resources")
public class WebResourceController {

    private final WebResourceConverter webResourceConverter;
    private final WebResourceService webResourceService;
    private final RatingService ratingService;
    private final ReviewService reviewService;

    @GetMapping("/sites-rating")
    public String getSitesRatingPage(
        Model model,
        @RequestParam(required = false, defaultValue = "0") Integer page,
        @RequestParam(required = false) String searchUrl
    ) {
        PageRequest pageRequest = PageRequest.of(page, 10);
        Page<WebResource> webResourcesPage;

        Map<String, String> responseAdditionalParameters = new HashMap<>();
        // TODO: Добавить критерии!
        if (StringUtils.isNotBlank(searchUrl)) {
            webResourcesPage = webResourceService.getSitesWithReviews(searchUrl, pageRequest);
            responseAdditionalParameters.put("searchUrl", searchUrl);
        } else {
            webResourcesPage = webResourceService.getSitesWithReviews(pageRequest);
        }

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

        model.addAttribute("sites", webResourceDTOS);
        model.addAttribute("currentPageNumber", webResourcesPage.getNumber());
        model.addAttribute("pagesCount", webResourcesPage.getTotalPages());
        model.addAttribute("additionalParameters", responseAdditionalParameters);

        return "sitesRating";
    }

    @GetMapping("/{resourceId}")
    public String getWebResourceDetailsPage(Model model, @PathVariable String resourceId, @RequestParam(required = false, defaultValue = "0") Integer reviewsPage) {
        WebResource webResource = webResourceService.getById(resourceId);
        ResourceRating resourceRating = ratingService.getResourceFullRatingById(webResource.getId());

        Page<Review> reviews = reviewService.getReviews(
            ReviewsCriteria.builder().resourceId(resourceId).build(),
            PageRequest.of(reviewsPage, 10)
        );

        WebResourceDTO webResourceDTO = webResourceConverter.toDTO(webResource);
        webResourceDTO.setRating(resourceRating.getRating());
        webResourceDTO.setReviewsCount(resourceRating.getReviewsCount());

        model.addAttribute("webResource", webResourceDTO);
        model.addAttribute("webResourceHost", UrlUtils.getHost(webResourceDTO.getUrl()));
        model.addAttribute("reviews", reviews.getContent());
        model.addAttribute("isLastReviewPage", reviews.isLast());
        model.addAttribute("currentPageNumber", reviews.getNumber());

        return "webResourceDetails";
    }
}
