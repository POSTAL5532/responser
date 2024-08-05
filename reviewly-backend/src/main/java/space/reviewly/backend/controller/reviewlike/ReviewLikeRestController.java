package space.reviewly.backend.controller.reviewlike;

import static space.reviewly.backend.config.ApplicationProperties.API_ROOT_PATH;

import space.reviewly.backend.config.CustomOAuth2AuthenticatedPrincipal;
import space.reviewly.backend.controller.RestApiController;
import space.reviewly.backend.controller.reviewlike.payload.ReviewLikeInfoDTO;
import space.reviewly.backend.controller.reviewlike.payload.ReviewLikeDTO;
import space.reviewly.backend.converter.ReviewLikeConverter;
import space.reviewly.backend.model.review.ReviewLike;
import space.reviewly.backend.service.ReviewLikeService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Review likes controller for operations with ReviewLike entities.
 *
 * @author Shcherbachenya Igor
 */
@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping(API_ROOT_PATH + "/review-likes")
public class ReviewLikeRestController extends RestApiController {

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
    public ResponseEntity<ReviewLikeDTO> createLike(@Valid @NotNull @RequestBody ReviewLikeInfoDTO likeInfoDTO, CustomOAuth2AuthenticatedPrincipal principal) {
        log.debug("Create like {} by user {}.", likeInfoDTO, principal.getUserId());
        ReviewLike newLike = reviewLikeConverter.toReviewLike(likeInfoDTO, principal.getUserId());
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
        CustomOAuth2AuthenticatedPrincipal principal
    ) {
        log.debug("Update like {} with data {} by user {}.", likeId, likeInfoDTO, principal.getUserId());
        ReviewLike reviewLike = reviewLikeConverter.toReviewLike(likeId, likeInfoDTO, principal.getUserId());
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
    public ResponseEntity<Void> removeLike(@Valid @NotEmpty @PathVariable String likeId, CustomOAuth2AuthenticatedPrincipal principal) {
        log.debug("Remove like {} by user {}.", likeId, principal.getUserId());
        reviewLikeService.removeLike(likeId, principal.getUserId());
        return ResponseEntity.ok().build();
    }
}
