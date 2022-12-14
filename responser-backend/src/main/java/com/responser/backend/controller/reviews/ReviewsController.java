package com.responser.backend.controller.reviews;

import com.responser.backend.controller.reviews.payload.ReviewDataPayload;
import com.responser.backend.controller.reviews.payload.ReviewPayload;
import com.responser.backend.controller.reviews.payload.ReviewsRequestCriteria;
import com.responser.backend.converter.ReviewsCriteriaConverter;
import com.responser.backend.converter.ReviewConverter;
import com.responser.backend.model.Review;
import com.responser.backend.service.review.ReviewService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.security.Principal;
import java.util.List;
import java.util.Objects;

/**
 * ResponsesController
 *
 * @author SIE
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/reviews")
public class ReviewsController {

    private final ReviewService reviewService;

    private final ReviewConverter reviewConverter;

    private final ReviewsCriteriaConverter reviewsCriteriaConverter;

    @GetMapping
    public ResponseEntity<List<ReviewPayload>> getReviews(@Valid @NotNull ReviewsRequestCriteria criteria, Principal principal) {
        if (StringUtils.isNotEmpty(criteria.getForUserId())) {
            if (Objects.isNull(principal) || !principal.getName().equals(criteria.getForUserId())) {
                return ResponseEntity.status(HttpStatusCode.valueOf(401)).build();
            }
        }

        List<Review> reviews = reviewService.getReviews(reviewsCriteriaConverter.toReviewsCriteria(criteria));
        return ResponseEntity.ok(reviewConverter.toReviewPayloadList(reviews));
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewPayload> getReview(@Valid @NotBlank @PathVariable String reviewId) {
        Review review = reviewService.getReview(reviewId);
        return ResponseEntity.ok(reviewConverter.toResponsePayload(review));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReviewPayload> createReview(@Valid @NotNull @RequestBody ReviewDataPayload review, Principal principal) {
        Review newReview = reviewConverter.toReview(review, principal.getName());
        ReviewPayload newReviewPayload = reviewConverter.toResponsePayload(reviewService.createReview(newReview));

        return ResponseEntity.ok(newReviewPayload);
    }

    @PutMapping("/{reviewId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReviewPayload> updateReview(
            @Valid @NotNull @PathVariable String reviewId,
            @Valid @NotNull @RequestBody ReviewDataPayload responseDTO,
            Principal principal
    ) {
        Review review = reviewConverter.toReview(reviewId, responseDTO, principal.getName());
        ReviewPayload updatedReviewPayload = reviewConverter.toResponsePayload(reviewService.updateReview(review));

        return ResponseEntity.ok(updatedReviewPayload);
    }
}
