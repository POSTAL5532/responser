package com.responser.backend.service.review;

import com.responser.backend.exceptions.EntityAlreadyExistException;
import com.responser.backend.model.ReviewsCriteria;
import com.responser.backend.model.Review;
import com.responser.backend.model.User;
import com.responser.backend.repository.ReviewRepository;
import com.responser.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.MessageFormat;
import java.util.List;
import java.util.NoSuchElementException;

/**
 * ReviewService
 *
 * @author SIE
 */
@AllArgsConstructor
@Service
@Transactional(readOnly = true)
public class ReviewService {

    private final ReviewRepository reviewRepository;

    private final UserService userService;

    public Review getReviewByIdAndUser(String reviewId, String userId) {
        return reviewRepository.findByIdAndUserId(reviewId, userId).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format(
                        "Review with id ''{0}'' and user id ''{1}'' doesn't exist", reviewId, userId
                ))
        );
    }

    public Review getReview(String reviewId) {
        return reviewRepository.findById(reviewId).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format("Review ''{0}'' doesn't exist", reviewId))
        );
    }

    public List<Review> getReviews(ReviewsCriteria criteria) {
        return reviewRepository.findAll(ReviewSpecifications.getAll(criteria));
    }

    public Boolean existsByResourceIdAndUserId(String resourceId, String userId) {
        return reviewRepository.existsByResourceIdAndUserId(resourceId, userId);
    }

    public Boolean existsByIdAndUserId(String id, String userId) {
        return reviewRepository.existsByIdAndUserId(id, userId);
    }

    @Transactional
    public Review createReview(Review newReview) {
        String resourceId = newReview.getResourceId();
        String userId = newReview.getUser().getId();

        if (existsByResourceIdAndUserId(resourceId, userId)) {
            throw new EntityAlreadyExistException(MessageFormat.format(
                    "User with id ''{0}'' already leve review for resource with id ''{1}''",
                    userId,
                    resourceId
            ));
        }

        User referenceUser = userService.getUser(userId);
        newReview.setUser(referenceUser);
        return reviewRepository.save(newReview);
    }

    @Transactional
    public Review updateReview(Review review) {
        Review oldReview = this.getReviewByIdAndUser(review.getId(), review.getUser().getId());
        oldReview.setText(review.getText());
        oldReview.setRating(review.getRating());

        return reviewRepository.save(oldReview);
    }

    @Transactional
    public void removeReview(String reviewId, String userId) {
        if (!existsByIdAndUserId(reviewId, userId)) {
            throw new NoSuchElementException(MessageFormat.format(
                    "Review ''{0}'' from user ''{1}'' doesn't exist.", reviewId, userId
            ));
        }

        reviewRepository.deleteById(reviewId);
    }
}
