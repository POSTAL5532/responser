package space.reviewly.backend.service;

import space.reviewly.backend.exceptions.EntityAlreadyExistException;
import space.reviewly.backend.model.review.ReviewLike;
import space.reviewly.backend.repository.ReviewLikeRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static java.text.MessageFormat.format;
import java.util.NoSuchElementException;

/**
 * ReviewLikeService
 *
 * @author Shcherbachenya Igor
 */
@Slf4j
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
            log.error("User {} already left reaction for review {}", userId, reviewId);
            throw new EntityAlreadyExistException(format("User ''{0}'' already left reaction for review ''{1}''", userId, reviewId));
        }

        return reviewLikeRepository.save(newLike);
    }

    @Transactional
    public ReviewLike updateLike(ReviewLike updatedLike) {
        String likeId = updatedLike.getId();
        String userId = updatedLike.getUserId();

        ReviewLike like = reviewLikeRepository
                .findByIdAndUserId(likeId, userId)
                .orElseThrow(() -> {
                    log.error("Like {} from user {} doesn't exist.", likeId, userId);
                    return new NoSuchElementException(format("Like ''{0}'' from user ''{1}'' doesn't exist.", likeId, userId));
                });

        like.setPositive(updatedLike.getPositive());

        return reviewLikeRepository.save(like);
    }

    @Transactional
    public void removeLike(String likeId, String userId) {
        if (!existsByIdAndUserId(likeId, userId)) {
            log.error("Like {} from user {} doesn't exist.", likeId, userId);
            throw new NoSuchElementException(format("Like ''{0}'' from user ''{1}'' doesn't exist.", likeId, userId));
        }

        reviewLikeRepository.deleteById(likeId);
    }
}
