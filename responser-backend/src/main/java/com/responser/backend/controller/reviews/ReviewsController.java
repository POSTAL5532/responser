package com.responser.backend.controller.reviews;

import com.responser.backend.config.ApplicationProperties;
import com.responser.backend.controller.reviews.payload.ReviewsRequestCriteria;
import com.responser.backend.converter.ReviewsCriteriaConverter;
import com.responser.backend.model.Review;
import com.responser.backend.model.ReviewLike;
import com.responser.backend.model.ReviewMetaImage;
import com.responser.backend.model.ReviewsCriteriaSortingField;
import com.responser.backend.model.metatags.FacebookMetaTags;
import com.responser.backend.model.metatags.SocialMetaTags;
import com.responser.backend.model.metatags.TwitterMetaTags;
import com.responser.backend.service.review.ReviewMetaImageService;
import com.responser.backend.service.review.ReviewService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping(ReviewsController.REVIEWS_URL)
public class ReviewsController {

    public static final String REVIEWS_URL = "/reviews";
    public static final String SEE_REVIEWS_URL = "/see-reviews";
    public static final String REVIEW_META_IMAGE_URL = "/meta-image";

    private final ReviewService reviewService;
    private final ReviewMetaImageService metaImageService;
    private final ApplicationProperties applicationProperties;
    private final ReviewsCriteriaConverter reviewsCriteriaConverter;

    @GetMapping(SEE_REVIEWS_URL)
    public String getReviewsList(
        Model model,
        @Valid @NotNull ReviewsRequestCriteria criteria,
        @RequestParam(required = false, defaultValue = "0") Integer page
    ) {
        if (Objects.isNull(criteria.getSortingField())) {
            criteria.setSortingField(ReviewsCriteriaSortingField.CREATION_DATE);
            criteria.setSortDirection(Direction.DESC);
        }

        Page<Review> reviews = reviewService.getReviews(
            reviewsCriteriaConverter.toReviewsCriteria(criteria),
            PageRequest.of(page, 10)
        );

        Pair<String, String> getReviewsNavigationLinks = getReviewsNavigationLinks(criteria, reviews);

        model.addAttribute("criteria", criteria);
        model.addAttribute("reviews", reviews.getContent());
        model.addAttribute("reviewsCount", reviews.getTotalElements());
        model.addAttribute("previousSearchUrl", getReviewsNavigationLinks.getLeft());
        model.addAttribute("nextSearchUrl", getReviewsNavigationLinks.getRight());

        return "seeReviewsPage";
    }

    @GetMapping("/{reviewId}")
    public ModelAndView getReview(ModelAndView modelAndView, @Valid @NotNull @PathVariable String reviewId) {
        Review review = reviewService.getReview(reviewId);

        modelAndView.setViewName("reviewPage");

        modelAndView.addObject("review", review);
        modelAndView.addObject("positiveReactions", review.getLikes().stream().filter(ReviewLike::getPositive).count());
        modelAndView.addObject("negativeReactions", review.getLikes().stream().filter(r -> !r.getPositive()).count());
        modelAndView.addObject("facebookMetaTags", new FacebookMetaTags(review, applicationProperties));
        modelAndView.addObject("twitterMetaTags", new TwitterMetaTags(review, applicationProperties));

        return modelAndView;
    }

    @ResponseBody
    @GetMapping(REVIEW_META_IMAGE_URL + "/{rawReviewId}")
    public ResponseEntity<byte[]> getReviewMetaImage(@Valid @NotNull @PathVariable String rawReviewId) {
        String reviewId = rawReviewId.split(SocialMetaTags.ID_TIMESTAMP_SEPARATOR)[0];
        ReviewMetaImage metaImage = metaImageService.getByReviewId(reviewId);

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + reviewId + ".png\"")
            .contentType(MediaType.IMAGE_PNG)
            .body(metaImage.getImage());
    }

    private Pair<String, String> getReviewsNavigationLinks(ReviewsRequestCriteria criteria, Page<Review> reviews) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();

        if (criteria.hasSortingField()) {
            params.add("sortingField", criteria.getSortingField().name());
        }

        if (criteria.hasSortDirection()) {
            params.add("sortDirection", criteria.getSortDirection().name());
        }

        if (criteria.hasResourceType()) {
            params.add("resourceType", criteria.getResourceType().name());
        }

        if (criteria.hasMinRating()) {
            params.add("minRating", criteria.getMinRating().toString());
        }

        if (criteria.hasMaxRating()) {
            params.add("maxRating", criteria.getMaxRating().toString());
        }

        String previousSearchUrl = null;
        String nextSearchUrl = null;

        String seeReviewsUrl = REVIEWS_URL + SEE_REVIEWS_URL;
        if (reviews.hasPrevious()) {
            params.add("page", String.valueOf((reviews.getNumber() - 1)));
            previousSearchUrl = UriComponentsBuilder.newInstance().path(seeReviewsUrl).queryParams(params).toUriString();
            params.remove("page");
        }

        if (reviews.hasNext()) {
            params.add("page", String.valueOf((reviews.getNumber() + 1)));
            nextSearchUrl = UriComponentsBuilder.newInstance().path(seeReviewsUrl).queryParams(params).toUriString();
        }

        return new ImmutablePair<>(previousSearchUrl, nextSearchUrl);
    }
}
