package com.responser.backend.converter;

import com.responser.backend.controller.reviews.payload.ReviewDataPayload;
import com.responser.backend.controller.reviews.payload.ReviewPayload;
import com.responser.backend.model.Review;
import com.responser.backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * ResponseConverter
 *
 * @author SIE
 */
@RequiredArgsConstructor
@Service
public class ReviewConverter {

    private final UserConverter userConverter;

    private final ReviewLikeConverter reviewLikeConverter;

    public Review toReview(String reviewId, ReviewDataPayload reviewDataPayload, String userId) {
        User fakeUser = new User();
        fakeUser.setId(userId);

        Review review = new Review();
        review.setId(reviewId);
        review.setResourceId(reviewDataPayload.getResourceId());
        review.setRating(reviewDataPayload.getRating());
        review.setText(reviewDataPayload.getText());
        review.setUser(fakeUser);

        return review;
    }

    public Review toReview(ReviewDataPayload reviewDataPayload, String userId) {
        return toReview(null, reviewDataPayload, userId);
    }

    public ReviewPayload toResponsePayload(Review review) {
        return ReviewPayload.builder()
                .id(review.getId())
                .resourceId(review.getResourceId())
                .user(userConverter.toUserInfoPayload(review.getUser()))
                .rating(review.getRating())
                .text(review.getText())
                .reviewLikes(reviewLikeConverter.toReviewLikePayloads(review.getLikes()))
                .creationDate(review.getCreationDate())
                .updateDate(review.getUpdateDate())
                .build();
    }

    public List<ReviewPayload> toReviewPayloadList(List<Review> reviews) {
        return reviews.stream().map(this::toResponsePayload).collect(Collectors.toList());
    }
}
