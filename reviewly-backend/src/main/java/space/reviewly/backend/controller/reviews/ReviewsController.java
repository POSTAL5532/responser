package space.reviewly.backend.controller.reviews;

import space.reviewly.backend.config.ApplicationProperties;
import space.reviewly.backend.controller.reviews.payload.ReviewsRequestCriteria;
import space.reviewly.backend.converter.ReviewConverter;
import space.reviewly.backend.converter.ReviewsCriteriaConverter;
import space.reviewly.backend.model.ResourceRating;
import space.reviewly.backend.model.Review;
import space.reviewly.backend.model.ReviewLike;
import space.reviewly.backend.model.ReviewsCriteriaResourceType;
import space.reviewly.backend.model.ReviewsCriteriaSortingField;
import space.reviewly.backend.model.metatags.FacebookMetaTags;
import space.reviewly.backend.model.metatags.SocialMetaTags;
import space.reviewly.backend.model.metatags.TwitterMetaTags;
import space.reviewly.backend.service.RatingService;
import space.reviewly.backend.service.review.ReviewMetaImageGenerator;
import space.reviewly.backend.service.review.ReviewService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping(ReviewsController.REVIEWS_URL)
public class ReviewsController {

    public static final String REVIEWS_URL = "/reviews";
    public static final String SEE_REVIEWS_URL = "/see-reviews";
    public static final String REVIEW_META_IMAGE_URL = "/meta-image";

    private final ReviewService reviewService;
    private final ApplicationProperties applicationProperties;
    private final ReviewsCriteriaConverter reviewsCriteriaConverter;
    private final ReviewConverter reviewConverter;
    private final RatingService ratingService;
    private final ReviewMetaImageGenerator reviewMetaImageGenerator;

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

        if (Objects.isNull(criteria.getResourceType())) {
            criteria.setResourceType(ReviewsCriteriaResourceType.ALL);
        }

        Page<Review> reviews = reviewService.getReviews(
            reviewsCriteriaConverter.toReviewsCriteria(criteria),
            PageRequest.of(page, 10)
        );

        model.addAttribute("criteria", criteria);
        model.addAttribute("reviews", reviewConverter.toPageableReviewPayloadList(reviews));

        return "seeReviewsPage";
    }

    @GetMapping("/{reviewId}")
    public ModelAndView getReview(ModelAndView modelAndView, @Valid @NotNull @PathVariable String reviewId) {
        Review review = reviewService.getReview(reviewId);
        ResourceRating resourceRating = ratingService.getResourceFullRatingById(
            review.getWebResource().getParent() == null
                ? review.getWebResource().getId()
                : review.getWebResource().getParent().getId()
        );

        modelAndView.setViewName("reviewPage");

        modelAndView.addObject("review", reviewConverter.toReviewPayload(review));
        modelAndView.addObject("resourceRating", resourceRating.getRating());
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

        Review review = reviewService.getReview(reviewId);
        reviewMetaImageGenerator.generate(review).toByteArray();

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + reviewId + ".png\"")
            .contentType(MediaType.IMAGE_PNG)
            .body(reviewMetaImageGenerator.generate(review).toByteArray());
    }
}
