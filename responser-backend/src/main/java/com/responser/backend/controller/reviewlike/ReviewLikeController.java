package com.responser.backend.controller.reviewlike;

import com.responser.backend.controller.reviewlike.payload.ReviewLikeInfoDTO;
import com.responser.backend.controller.reviewlike.payload.ReviewLikeDTO;
import com.responser.backend.converter.ReviewLikeConverter;
import com.responser.backend.model.ReviewLike;
import com.responser.backend.service.ReviewLikeService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

/**
 * ReviewLikeController
 *
 * @author SIE
 */

@AllArgsConstructor
@RestController
@RequestMapping("/api/review-likes")
public class ReviewLikeController {

    private final ReviewLikeService reviewLikeService;

    private final ReviewLikeConverter reviewLikeConverter;

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<ReviewLikeDTO> createLike(
        @Valid @NotNull @RequestBody ReviewLikeInfoDTO newLikePayload, Principal principal
    ) {
        ReviewLike newLike = reviewLikeConverter.toReviewLike(newLikePayload, principal.getName());
        ReviewLike createdLike = reviewLikeService.createLike(newLike);
        return ResponseEntity.ok(reviewLikeConverter.toReviewLikePayload(createdLike));
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/{likeId}")
    public ResponseEntity<ReviewLikeDTO> updateLike(
            @Valid @NotBlank @PathVariable String likeId,
            @Valid @NotNull @RequestBody ReviewLikeInfoDTO likePayload,
            Principal principal
    ) {
        ReviewLike reviewLike = reviewLikeConverter.toReviewLike(likeId, likePayload, principal.getName());
        ReviewLike updatedLike = reviewLikeService.updateLike(reviewLike);
        return ResponseEntity.ok(reviewLikeConverter.toReviewLikePayload(updatedLike));
    }

    @DeleteMapping("/{likeId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> removeLike(@Valid @NotEmpty @PathVariable String likeId, Principal principal) {
        reviewLikeService.removeLike(likeId, principal.getName());
        return ResponseEntity.ok().build();
    }
}
