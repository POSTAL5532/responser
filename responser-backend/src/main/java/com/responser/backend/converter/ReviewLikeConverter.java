package com.responser.backend.converter;

import com.responser.backend.controller.reviewlike.payload.ReviewLikeInfoDTO;
import com.responser.backend.controller.reviewlike.payload.ReviewLikeDTO;
import com.responser.backend.model.Review;
import com.responser.backend.model.ReviewLike;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ReviewLikeConverter {

    public ReviewLike toReviewLike(String likeId, ReviewLikeInfoDTO dataPayload, String userId) {
        Review fakeReview = new Review();
        fakeReview.setId(dataPayload.getReviewId());

        ReviewLike reviewLike = new ReviewLike();
        reviewLike.setId(likeId);
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
