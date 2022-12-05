package com.responser.backend.controller.responses;

import com.responser.backend.controller.responses.payload.ReviewDataPayload;
import com.responser.backend.controller.responses.payload.ReviewPayload;
import com.responser.backend.converter.ReviewConverter;
import com.responser.backend.model.Review;
import com.responser.backend.service.ResponsesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.security.Principal;
import java.util.List;

/**
 * ResponsesController
 *
 * @author SIE
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/reviews")
public class ReviewsController {

    private final ResponsesService responsesService;

    private final ReviewConverter reviewConverter;

    @GetMapping
    public ResponseEntity<List<ReviewPayload>> getReviewsForResource(@Valid @NotBlank @RequestParam String resourceId) {
        List<Review> reviews = responsesService.getAllForResource(resourceId);
        return ResponseEntity.ok(reviewConverter.toReviewPayloadList(reviews));
    }

    @GetMapping("/{reviewId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReviewPayload> getReview(@Valid @NotBlank @PathVariable String reviewId, Principal principal) {
        Review review = responsesService.getResponseByIdAndUser(reviewId, principal.getName());
        return ResponseEntity.ok(reviewConverter.toResponsePayload(review));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Review> createReview(@Valid @NotNull @RequestBody ReviewDataPayload review, Principal principal) {
        Review newReview = reviewConverter.toReview(review, principal.getName());
        return ResponseEntity.ok(responsesService.createResponse(newReview));
    }

    @PutMapping("/{reviewId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Review> updateReview(
            @Valid @NotNull @PathVariable String reviewId,
            @Valid @NotNull @RequestBody ReviewDataPayload responseDTO,
            Principal principal
    ) {
        Review review = reviewConverter.toReview(reviewId, responseDTO, principal.getName());
        return ResponseEntity.ok(responsesService.updateResponse(review));
    }
}
