package space.reviewly.backend.converter;

import space.reviewly.backend.controller.payload.PageableResponse;
import space.reviewly.backend.controller.reviewlike.payload.ReviewLikeDTO;
import space.reviewly.backend.controller.reviews.payload.ReviewInfoAdminDTO;
import space.reviewly.backend.controller.reviews.payload.ReviewInfoDTO;
import space.reviewly.backend.controller.reviews.payload.ReviewDTO;
import space.reviewly.backend.model.review.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * {@link Review}, {@link ReviewDTO}, {@link ReviewInfoDTO} converter.
 *
 * @author Shcherbachenya Igor
 */
@RequiredArgsConstructor
@Service
public class ReviewConverter {

    private final UserConverter userConverter;

    private final ReviewLikeConverter reviewLikeConverter;

    private final WebResourceConverter webResourceConverter;

    public Review toReview(String reviewId, ReviewInfoDTO reviewInfoDTO, String userId) {
        Review review = new Review();
        review.setId(reviewId);
        review.setResourceId(reviewInfoDTO.getResourceId());
        review.setRating(reviewInfoDTO.getRating());
        review.setText(reviewInfoDTO.getText());
        review.setUserId(userId);

        return review;
    }

    public Review toReview(ReviewInfoDTO reviewInfoDTO, String userId) {
        return toReview(null, reviewInfoDTO, userId);
    }

    public Review toReview(ReviewInfoAdminDTO reviewInfoAdminDTO) {
        ReviewInfoDTO reviewInfoDTO = ReviewInfoDTO.builder()
            .resourceId(reviewInfoAdminDTO.getResourceId())
            .rating(reviewInfoAdminDTO.getRating())
            .text(reviewInfoAdminDTO.getText())
            .build();

        Review review = toReview(reviewInfoDTO, reviewInfoAdminDTO.getUserId());
        review.setSource(reviewInfoAdminDTO.getSource());

        return review;
    }

    public ReviewDTO toReviewPayload(Review review) {
        Collection<ReviewLikeDTO> reviewLikes = Objects.isNull(review.getLikes())
            ? Collections.emptyList()
            : reviewLikeConverter.toReviewLikePayloads(review.getLikes());

        return ReviewDTO.builder()
            .id(review.getId())
            .resourceId(review.getResourceId())
            .user(userConverter.toUserBasicDTO(review.getUser()))
            .rating(review.getRating())
            .text(review.getText())
            .source(review.getSource())
            .reviewLikes(reviewLikes)
            .webResource(webResourceConverter.toDTO(review.getWebResource()))
            .creationDate(review.getCreationDate())
            .updateDate(review.getUpdateDate())
            .build();
    }

    public PageableResponse<ReviewDTO> toPageableReviewPayloadList(Page<Review> reviewsPage) {
        List<ReviewDTO> reviewList = reviewsPage.get().map(this::toReviewPayload).collect(Collectors.toList());
        return new PageableResponse<>(
            reviewsPage.getTotalElements(),
            reviewsPage.getTotalPages(),
            reviewsPage.getNumber(),
            reviewsPage.getNumberOfElements(),
            reviewsPage.isLast(),
            reviewsPage.isFirst(),
            reviewsPage.hasPrevious(),
            reviewsPage.hasNext(),
            reviewList
        );
    }
}
