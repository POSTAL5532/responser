package com.responser.backend.converter;

import com.responser.backend.controller.reviewlike.payload.ReviewLikeDTO;
import com.responser.backend.controller.reviews.payload.ReviewInfoDTO;
import com.responser.backend.controller.reviews.payload.ReviewDTO;
import com.responser.backend.model.ResourceType;
import com.responser.backend.model.Review;
import com.responser.backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
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

    public Review toReview(String reviewId, ReviewInfoDTO reviewInfoDTO, String userId) {
        User fakeUser = new User();
        fakeUser.setId(userId);

        Review review = new Review();
        review.setId(reviewId);
        review.setResourceType(ResourceType.valueOf(reviewInfoDTO.getResourceType()));
        review.setResourceId(reviewInfoDTO.getResourceId());
        review.setRating(reviewInfoDTO.getRating());
        review.setText(reviewInfoDTO.getText());
        review.setUser(fakeUser);

        return review;
    }

    public Review toReview(ReviewInfoDTO reviewInfoDTO, String userId) {
        return toReview(null, reviewInfoDTO, userId);
    }

    public ReviewDTO toResponsePayload(Review review) {
        Collection<ReviewLikeDTO> reviewLikes = Objects.isNull(review.getLikes())
                ? Collections.emptyList()
                : reviewLikeConverter.toReviewLikePayloads(review.getLikes());

        return ReviewDTO.builder()
                .id(review.getId())
                .resourceId(review.getResourceId())
                .resourceType(review.getResourceType())
                .user(userConverter.toUserInfoPayload(review.getUser()))
                .rating(review.getRating())
                .text(review.getText())
                .reviewLikes(reviewLikes)
                .creationDate(review.getCreationDate())
                .updateDate(review.getUpdateDate())
                .build();
    }

    public List<ReviewDTO> toReviewPayloadList(List<Review> reviews) {
        return reviews.stream().map(this::toResponsePayload).collect(Collectors.toList());
    }
}
