package com.responser.backend.service.review;

import com.responser.backend.exceptions.EntityAlreadyExistException;
import com.responser.backend.model.ReviewsCriteria;
import com.responser.backend.model.Review;
import com.responser.backend.model.User;
import com.responser.backend.repository.ReviewRepository;
import com.responser.backend.repository.ReviewRepositoryImpl;
import com.responser.backend.service.UserService;
import com.responser.backend.service.WebResourceService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static java.text.MessageFormat.*;

import java.util.NoSuchElementException;

/**
 * Review service
 *
 * @author Shcherbachenya Igor
 */
@AllArgsConstructor
@Service
@Transactional(readOnly = true)
public class ReviewService {

    private final ReviewRepositoryImpl reviewRepositoryImpl;

    private final ReviewRepository reviewRepository;

    private final UserService userService;

    private final WebResourceService webResourceService;

    private final ReviewMetaImageService metaImageService;

    public Review getReviewByIdAndUser(String reviewId, String userId) {
        return reviewRepositoryImpl.findByIdAndUserId(reviewId, userId).orElseThrow(() ->
            new NoSuchElementException(format(
                "Review with id ''{0}'' and user id ''{1}'' doesn't exist", reviewId, userId
            ))
        );
    }

    public Review getReview(String reviewId) {
        return reviewRepositoryImpl.findById(reviewId).orElseThrow(() ->
            new NoSuchElementException(format("Review ''{0}'' doesn't exist", reviewId))
        );
    }

    public Page<Review> getReviews(ReviewsCriteria criteria, Pageable pageable) {
        return reviewRepository.findAll(ReviewSpecifications.getAll(criteria), pageable);
    }

    public Boolean existsByResourceIdAndUserId(String resourceId, String userId) {
        return reviewRepositoryImpl.existsByResourceIdAndUserId(resourceId, userId);
    }

    /**
     * Check existence of resource by resource ID.
     *
     * @param resourceId resource ID
     * @return existence flag
     */
    public Boolean isResourceExists(String resourceId) {
        return webResourceService.existById(resourceId);
    }

    /**
     * Create review for resource, if user didn't leave review yet.
     *
     * @param newReview new review model
     * @return initialized review model
     */
    @Transactional
    public Review createReview(Review newReview) {
        String resourceId = newReview.getResourceId();
        String userId = newReview.getUserId();

        if (!isResourceExists(resourceId)) {
            throw new NoSuchElementException(format("Resource ''{0}'' ({1}) doesn't exist.", resourceId));
        }

        if (existsByResourceIdAndUserId(resourceId, userId)) {
            throw new EntityAlreadyExistException(format(
                "User ''{0}'' already left review for resource ''{1}''", userId, resourceId
            ));
        }

        User referenceUser = userService.getUser(userId);
        newReview.setUser(referenceUser);
        Review savedReview = reviewRepositoryImpl.save(newReview);

        metaImageService.create(savedReview);

        return savedReview;
    }

    @Transactional
    public Review updateReview(Review review) {
        Review oldReview = this.getReviewByIdAndUser(review.getId(), review.getUser().getId());
        oldReview.setText(review.getText());
        oldReview.setRating(review.getRating());
        Review updatedReview = reviewRepositoryImpl.update(oldReview);

        metaImageService.update(updatedReview);

        return updatedReview;
    }

    /**
     * Remove review, which was left by user.
     *
     * @param reviewId review ID
     * @param userId user ID
     */
    @Transactional
    public void removeReview(String reviewId, String userId) {
        Review review = reviewRepositoryImpl.findByIdAndUserId(reviewId, userId)
            .orElseThrow(() -> new NoSuchElementException(format(
                    "Review ''{0}'' from user ''{1}'' doesn't exist.", reviewId, userId
                ))
            );

        reviewRepositoryImpl.delete(review);
    }
}
