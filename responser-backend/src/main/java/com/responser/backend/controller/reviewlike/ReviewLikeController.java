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
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

/**
 * Review likes controller for operations with ReviewLike entities.
 *
 * @author Shcherbachenya Igor
 */
@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("/api/review-likes")
public class ReviewLikeController {

    private final ReviewLikeService reviewLikeService;

    private final ReviewLikeConverter reviewLikeConverter;

    /**
     * Creates new {@link ReviewLike} by {@link ReviewLikeInfoDTO}.
     *
     * @param likeInfoDTO new review like DTO
     * @return {@link ReviewLikeDTO}
     */
    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<ReviewLikeDTO> createLike(@Valid @NotNull @RequestBody ReviewLikeInfoDTO likeInfoDTO, Principal principal) {
        log.info("Create like {} by user {}.", likeInfoDTO, principal.getName());
        ReviewLike newLike = reviewLikeConverter.toReviewLike(likeInfoDTO, principal.getName());
        ReviewLike createdLike = reviewLikeService.createLike(newLike);
        return ResponseEntity.ok(reviewLikeConverter.toReviewLikePayload(createdLike));
    }

    /**
     * Update existing {@link ReviewLike} by {@link ReviewLikeInfoDTO}.
     *
     * @param likeId review like ID
     * @param likeInfoDTO review like info DTO for updating
     * @return {@link ReviewLikeDTO}
     */
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/{likeId}")
    public ResponseEntity<ReviewLikeDTO> updateLike(
        @Valid @NotBlank @PathVariable String likeId,
        @Valid @NotNull @RequestBody ReviewLikeInfoDTO likeInfoDTO,
        Principal principal
    ) {
        log.info("Update like {} with data {} by user {}.", likeId, likeInfoDTO, principal.getName());
        ReviewLike reviewLike = reviewLikeConverter.toReviewLike(likeId, likeInfoDTO, principal.getName());
        ReviewLike updatedLike = reviewLikeService.updateLike(reviewLike);
        return ResponseEntity.ok(reviewLikeConverter.toReviewLikePayload(updatedLike));
    }

    /**
     * Delete {@link ReviewLike} by ID.
     *
     * @param likeId review like ID for deleting
     */
    @DeleteMapping("/{likeId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> removeLike(@Valid @NotEmpty @PathVariable String likeId, Principal principal) {
        log.info("Remove like {} by user {}.", likeId, principal.getName());
        reviewLikeService.removeLike(likeId, principal.getName());
        return ResponseEntity.ok().build();
    }
}
