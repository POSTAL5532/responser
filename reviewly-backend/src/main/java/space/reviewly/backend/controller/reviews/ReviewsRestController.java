package space.reviewly.backend.controller.reviews;

import static space.reviewly.backend.config.ApplicationProperties.API_ROOT_PATH;

import space.reviewly.backend.controller.RestApiController;
import space.reviewly.backend.controller.payload.PageableResponse;
import space.reviewly.backend.controller.payload.Pagination;
import space.reviewly.backend.controller.reviews.payload.ReviewInfoDTO;
import space.reviewly.backend.controller.reviews.payload.ReviewDTO;
import space.reviewly.backend.controller.reviews.payload.ReviewsRequestCriteria;
import space.reviewly.backend.converter.PaginationConverter;
import space.reviewly.backend.converter.ReviewConverter;
import space.reviewly.backend.converter.ReviewsCriteriaConverter;
import space.reviewly.backend.model.Review;
import space.reviewly.backend.model.ReviewsCriteria;
import space.reviewly.backend.service.review.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
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
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(API_ROOT_PATH + "/reviews")
public class ReviewsRestController extends RestApiController {

    private final ReviewService reviewService;
    private final ReviewConverter reviewConverter;
    private final PaginationConverter paginationConverter;
    private final ReviewsCriteriaConverter reviewsCriteriaConverter;

    /**
     * Returns {@link List< ReviewDTO >} by {@link ReviewsCriteria}. If request criteria contains forUserId parameter - check and compare authorized user.
     *
     * @param criteria reviews request criteria
     * @return {@link List<ReviewDTO>}
     */
    @GetMapping
    public ResponseEntity<PageableResponse<ReviewDTO>> getReviews(
        @Valid @NotNull ReviewsRequestCriteria criteria,
        @Valid @NotNull Pagination pagination,
        Principal principal
    ) {

        log.info("Get all reviews. Reviews request criteria {}.", criteria);

        if (StringUtils.isNotEmpty(criteria.getForUserId())) {
            if (Objects.isNull(principal) || !principal.getName().equals(criteria.getForUserId())) {
                log.error("Reviews request criteria with parameter 'forUserId' without authorization.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }

        Page<Review> reviews = reviewService.getReviews(
            reviewsCriteriaConverter.toReviewsCriteria(criteria),
            paginationConverter.toPageable(pagination)
        );

        return ResponseEntity.ok(reviewConverter.toPageableReviewPayloadList(reviews));
    }

    /**
     * Returns {@link ReviewDTO} by review ID
     *
     * @param reviewId review ID
     * @return {@link ReviewDTO}
     */
    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewDTO> getReview(@Valid @NotBlank @PathVariable String reviewId) {
        log.info("Get review {}.", reviewId);
        Review review = reviewService.getReview(reviewId);
        return ResponseEntity.ok(reviewConverter.toReviewPayload(review));
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
        log.info("Create review {}.", reviewInfoDTO);
        Review newReview = reviewConverter.toReview(reviewInfoDTO, principal.getName());
        ReviewDTO newReviewDTO = reviewConverter.toReviewPayload(reviewService.createReview(newReview));

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
        log.info("Update review {} with data {}.", reviewId, reviewInfoDTO);
        Review review = reviewConverter.toReview(reviewId, reviewInfoDTO, principal.getName());
        ReviewDTO updatedReviewDTO = reviewConverter.toReviewPayload(reviewService.updateReview(review));

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
        log.info("Remove review {} by user {}.", reviewId, principal.getName());
        reviewService.removeReview(reviewId, principal.getName());
        return ResponseEntity.ok().build();
    }
}
