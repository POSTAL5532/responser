package space.reviewly.backend.controller.reviews;

import static space.reviewly.backend.config.ApplicationProperties.ADMIN_API_ROOT_PATH;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import space.reviewly.backend.controller.RestApiController;
import space.reviewly.backend.controller.reviews.payload.ReviewDTO;
import space.reviewly.backend.controller.reviews.payload.ReviewInfoAdminDTO;
import space.reviewly.backend.converter.ReviewConverter;
import space.reviewly.backend.model.review.Review;
import space.reviewly.backend.service.review.ReviewService;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(ADMIN_API_ROOT_PATH + "/reviews")
public class AdminReviewsRestController extends RestApiController {

    private final ReviewService reviewService;
    private final ReviewConverter reviewConverter;

    @PostMapping("/create-fake")
    @PreAuthorize("hasAuthority('CREATE_FAKE_REVIEWS')")
    public ResponseEntity<ReviewDTO> createReview(@Valid @NotNull @RequestBody ReviewInfoAdminDTO reviewInfoDTO) {
        log.debug("Create review {}.", reviewInfoDTO);

        Review newReview = reviewConverter.toReview(reviewInfoDTO);
        ReviewDTO newReviewDTO = reviewConverter.toReviewPayload(reviewService.createReview(newReview));

        return ResponseEntity.ok(newReviewDTO);
    }
}
