package com.responser.backend.converter;

import com.responser.backend.controller.reviewlike.payload.ReviewLikeDataPayload;
import com.responser.backend.controller.reviewlike.payload.ReviewLikePayload;
import com.responser.backend.model.Review;
import com.responser.backend.model.ReviewLike;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ReviewLikeConverter {

    public ReviewLike toReviewLike(ReviewLikeDataPayload dataPayload, String userId) {
        Review fakeReview = new Review();
        fakeReview.setId(dataPayload.getReviewId());

        ReviewLike reviewLike = new ReviewLike();
        reviewLike.setReview(fakeReview);
        reviewLike.setUserId(userId);
        reviewLike.setPositive(dataPayload.getPositive());

        return reviewLike;
    }

    public Collection<ReviewLikePayload> toReviewLikePayloads(Collection<ReviewLike> reviewLikes) {
        return reviewLikes.stream().map(this::toReviewLikePayload).collect(Collectors.toList());
    }

    public ReviewLikePayload toReviewLikePayload(ReviewLike reviewLike) {
        return ReviewLikePayload.builder()
                .id(reviewLike.getId())
                .reviewId(reviewLike.getReview().getId())
                .userId(reviewLike.getUserId())
                .creationDate(reviewLike.getCreationDate())
                .updateDate(reviewLike.getUpdateDate())
                .positive(reviewLike.getPositive())
                .build();
    }
}
