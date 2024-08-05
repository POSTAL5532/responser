package space.reviewly.backend.converter;

import space.reviewly.backend.controller.reviewlike.payload.ReviewLikeInfoDTO;
import space.reviewly.backend.controller.reviewlike.payload.ReviewLikeDTO;
import space.reviewly.backend.model.review.Review;
import space.reviewly.backend.model.review.ReviewLike;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

/**
 * {@link ReviewLike}, {@link ReviewLikeDTO}, {@link ReviewLikeInfoDTO} converter.
 *
 * @author Shcherbachenya Igor
 */
@AllArgsConstructor
@Service
public class ReviewLikeConverter {

    public ReviewLike toReviewLike(String likeId, ReviewLikeInfoDTO dataPayload, String userId) {
        Review fakeReview = new Review();
        fakeReview.setId(dataPayload.getReviewId());

        ReviewLike reviewLike = new ReviewLike();
        reviewLike.setId(likeId);
        reviewLike.setReviewId(dataPayload.getReviewId());
        reviewLike.setReview(fakeReview);
        reviewLike.setUserId(userId);
        reviewLike.setPositive(dataPayload.getPositive());

        return reviewLike;
    }

    public ReviewLike toReviewLike(ReviewLikeInfoDTO dataPayload, String userId) {
        return toReviewLike(null, dataPayload, userId);
    }

    public Collection<ReviewLikeDTO> toReviewLikePayloads(Collection<ReviewLike> reviewLikes) {
        return reviewLikes.stream().map(this::toReviewLikePayload).collect(Collectors.toList());
    }

    public ReviewLikeDTO toReviewLikePayload(ReviewLike reviewLike) {
        return ReviewLikeDTO.builder()
            .id(reviewLike.getId())
            .reviewId(reviewLike.getReview().getId())
            .userId(reviewLike.getUserId())
            .creationDate(reviewLike.getCreationDate())
            .updateDate(reviewLike.getUpdateDate())
            .positive(reviewLike.getPositive())
            .build();
    }
}
