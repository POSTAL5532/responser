package com.responser.backend.service;

import com.responser.backend.exceptions.EntityAlreadyExistException;
import com.responser.backend.model.ReviewLike;
import com.responser.backend.repository.ReviewLikeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.MessageFormat;
import java.util.NoSuchElementException;

/**
 * ReviewLikeService
 *
 * @author SIE
 */
@AllArgsConstructor
@Service
@Transactional(readOnly = true)
public class ReviewLikeService {

    private final ReviewLikeRepository reviewLikeRepository;

    public Boolean existsByReviewIdAndUserId(String reviewId, String userId) {
        return reviewLikeRepository.existsByReviewIdAndUserId(reviewId, userId);
    }

    public Boolean existsByIdAndUserId(String likeId, String userId) {
        return reviewLikeRepository.existsByIdAndUserId(likeId, userId);
    }

    @Transactional
    public ReviewLike createLike(ReviewLike newLike) {
        String reviewId = newLike.getReview().getId();
        String userId = newLike.getUserId();

        if (existsByReviewIdAndUserId(reviewId, userId)) {
            throw new EntityAlreadyExistException(MessageFormat.format(
                    "User ''{0}'' already leve reaction for review ''{1}''", userId, reviewId
            ));
        }

        return reviewLikeRepository.save(newLike);
    }

    @Transactional
    public ReviewLike updateLike(ReviewLike updatedLike) {
        String likeId = updatedLike.getId();
        String userId = updatedLike.getUserId();

        ReviewLike like = reviewLikeRepository
                .findByIdAndUserId(likeId, userId)
                .orElseThrow(() -> new NoSuchElementException(MessageFormat.format(
                        "Like ''{0}'' from user ''{1}'' doesn't exist.", likeId, userId
                )));

        like.setPositive(updatedLike.getPositive());

        return reviewLikeRepository.save(like);
    }

    @Transactional
    public void removeLike(String likeId, String userId) {
        if (!existsByIdAndUserId(likeId, userId)) {
            throw new NoSuchElementException(MessageFormat.format(
                    "Like ''{0}'' from user ''{1}'' doesn't exist.", likeId, userId
            ));
        }

        reviewLikeRepository.deleteById(likeId);
    }
}
