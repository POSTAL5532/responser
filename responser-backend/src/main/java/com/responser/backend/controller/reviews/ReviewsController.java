package com.responser.backend.controller.reviews;

import com.responser.backend.config.ApplicationProperties;
import com.responser.backend.exceptions.DataNotValidException;
import com.responser.backend.model.Review;
import com.responser.backend.model.ReviewLike;
import com.responser.backend.model.ReviewMetaImage;
import com.responser.backend.model.Review_;
import com.responser.backend.model.ReviewsCriteria;
import com.responser.backend.model.metatags.FacebookMetaTags;
import com.responser.backend.model.metatags.SocialMetaTags;
import com.responser.backend.model.metatags.TwitterMetaTags;
import com.responser.backend.service.review.ReviewMetaImageService;
import com.responser.backend.service.review.ReviewService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    public static final String REVIEW_META_IMAGE_URL = "/meta-image";

    private final ReviewService reviewService;

    private final ReviewMetaImageService metaImageService;

    private final ApplicationProperties applicationProperties;

    @GetMapping("/see-reviews")
    public String getReviewsList(Model model, @RequestParam(required = false, defaultValue = "0") Integer page) {
        ReviewsCriteria criteria = ReviewsCriteria.builder().sortingField(Review_.CREATION_DATE).build();
        Page<Review> reviews = reviewService.getReviews(criteria, PageRequest.of(page, 10));

        model.addAttribute("reviews", reviews.getContent());
        model.addAttribute("currentPageNumber", reviews.getNumber());
        model.addAttribute("pagesCount", reviews.getTotalPages());

        // TODO: Сделать абстрактный класс для API контроллеров с собственным exception handling (см. RestExceptionHandler)
        throw new DataNotValidException("AAAAAAAAAAAAA! Some error message!");

//        return "seeReviewsPage";
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
}
