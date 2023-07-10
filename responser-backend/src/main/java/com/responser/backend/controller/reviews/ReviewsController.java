package com.responser.backend.controller.reviews;

import com.responser.backend.config.APIServerApplicationProperties;
import com.responser.backend.model.Review;
import com.responser.backend.model.ReviewLike;
import com.responser.backend.model.metatags.FacebookMetaTags;
import com.responser.backend.model.metatags.TwitterMetaTags;
import com.responser.backend.service.review.ReviewService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping(ReviewsController.REVIEWS_URL)
public class ReviewsController {

    public static final String REVIEWS_URL = "/reviews";

    private final ReviewService reviewService;

    private final APIServerApplicationProperties applicationProperties;

    /*@GetMapping
    public ModelAndView getReviewsList(ModelAndView modelAndView, @Valid @NotNull @RequestParam Integer page) {
        ReviewsCriteria criteria = ReviewsCriteria.builder().sortingField(Review_.CREATION_DATE).build();
        Page<Review> reviews = reviewService.getReviews(criteria, PageRequest.of(page, 10));

        modelAndView.addObject("reviewsPageable", reviews);
        modelAndView.setViewName("reviewsListPage");

        return modelAndView;
    }*/

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
}
