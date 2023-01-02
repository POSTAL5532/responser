package com.responser.backend.controller.reviews;

import com.responser.backend.controller.reviews.payload.ReviewInfoDTO;
import com.responser.backend.controller.reviews.payload.ReviewDTO;
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
 * Reviews controller for operations with ReviewLike entities.
 *
 * @author Shcherbachenya Igor
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/reviews")
public class ReviewsController {

    private final ReviewService reviewService;

    private final ReviewConverter reviewConverter;

    private final ReviewsCriteriaConverter reviewsCriteriaConverter;

    /**
     * Returns {@link List<ReviewDTO>} by {@link ReviewsRequestCriteria}. If request criteria contains forUserId parameter - check and compare authorized user.
     *
     * @param criteria reviews request criteria
     * @return {@link List<ReviewDTO>}
     */
    @GetMapping
    public ResponseEntity<List<ReviewDTO>> getReviews(@Valid @NotNull ReviewsRequestCriteria criteria, Principal principal) {
        if (StringUtils.isNotEmpty(criteria.getForUserId())) {
            if (Objects.isNull(principal) || !principal.getName().equals(criteria.getForUserId())) {
                return ResponseEntity.status(HttpStatusCode.valueOf(401)).build();
            }
        }

        List<Review> reviews = reviewService.getReviews(reviewsCriteriaConverter.toReviewsCriteria(criteria));
        return ResponseEntity.ok(reviewConverter.toReviewPayloadList(reviews));
    }

    /**
     * Returns {@link ReviewDTO} by review ID
     *
     * @param reviewId review ID
     * @return {@link ReviewDTO}
     */
    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewDTO> getReview(@Valid @NotBlank @PathVariable String reviewId) {
        Review review = reviewService.getReview(reviewId);
        return ResponseEntity.ok(reviewConverter.toResponsePayload(review));
    }

    /**
     * Creates new {@link Review} by {@link ReviewDTO}.
     *
     * @param reviewInfoDTO new review DTO
     * @return initialized {@link ReviewDTO}
     */
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReviewDTO> createReview(@Valid @NotNull @RequestBody ReviewInfoDTO reviewInfoDTO, Principal principal) {
        Review newReview = reviewConverter.toReview(reviewInfoDTO, principal.getName());
        ReviewDTO newReviewDTO = reviewConverter.toResponsePayload(reviewService.createReview(newReview));

        return ResponseEntity.ok(newReviewDTO);
    }

    /**
     * Update {@link Review} entity by {@link ReviewDTO}.
     *
     * @param reviewId review ID
     * @param reviewInfoDTO review info DTO for updating
     * @return updated {@link ReviewDTO}
     */
    @PutMapping("/{reviewId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReviewDTO> updateReview(
            @Valid @NotNull @PathVariable String reviewId,
            @Valid @NotNull @RequestBody ReviewInfoDTO reviewInfoDTO,
            Principal principal
    ) {
        Review review = reviewConverter.toReview(reviewId, reviewInfoDTO, principal.getName());
        ReviewDTO updatedReviewDTO = reviewConverter.toResponsePayload(reviewService.updateReview(review));

        return ResponseEntity.ok(updatedReviewDTO);
    }

    /**
     * Delete {@link Review} by ID.
     *
     * @param reviewId review ID for deleting
     */
    @DeleteMapping("/{reviewId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> removeReview(@Valid @NotNull @PathVariable String reviewId, Principal principal) {
        reviewService.removeReview(reviewId, principal.getName());
        return ResponseEntity.ok().build();
    }
}
