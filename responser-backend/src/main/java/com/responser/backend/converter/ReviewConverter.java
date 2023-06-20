package com.responser.backend.converter;

import com.responser.backend.controller.payload.PageableResponse;
import com.responser.backend.controller.reviewlike.payload.ReviewLikeDTO;
import com.responser.backend.controller.reviews.payload.ReviewInfoDTO;
import com.responser.backend.controller.reviews.payload.ReviewDTO;
import com.responser.backend.model.Review;
import com.responser.backend.model.User;
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
        User fakeUser = new User();
        fakeUser.setId(userId);

        Review review = new Review();
        review.setId(reviewId);
        review.setResourceId(reviewInfoDTO.getResourceId());
        review.setRating(reviewInfoDTO.getRating());
        review.setText(reviewInfoDTO.getText());
        review.setUser(fakeUser);

        return review;
    }

    public Review toReview(ReviewInfoDTO reviewInfoDTO, String userId) {
        return toReview(null, reviewInfoDTO, userId);
    }

    public ReviewDTO toReviewPayload(Review review) {
        Collection<ReviewLikeDTO> reviewLikes = Objects.isNull(review.getLikes())
            ? Collections.emptyList()
            : reviewLikeConverter.toReviewLikePayloads(review.getLikes());

        return ReviewDTO.builder()
            .id(review.getId())
            .resourceId(review.getResourceId())
            .user(userConverter.toUserInfoPayload(review.getUser()))
            .rating(review.getRating())
            .text(review.getText())
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
            reviewList
        );
    }
}
