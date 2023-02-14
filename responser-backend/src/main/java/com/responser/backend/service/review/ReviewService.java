package com.responser.backend.service.review;

import com.responser.backend.exceptions.EntityAlreadyExistException;
import com.responser.backend.model.ResourceType;
import com.responser.backend.model.ReviewsCriteria;
import com.responser.backend.model.Review;
import com.responser.backend.model.User;
import com.responser.backend.repository.ReviewRepository;
import com.responser.backend.service.DomainService;
import com.responser.backend.service.PagesService;
import com.responser.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static java.text.MessageFormat.*;

import java.util.List;
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

    private final ReviewRepository reviewRepository;

    private final DomainService domainService;

    private final PagesService pagesService;

    private final UserService userService;

    public Review getReviewByIdAndUser(String reviewId, String userId) {
        return reviewRepository.findByIdAndUserId(reviewId, userId).orElseThrow(() ->
                new NoSuchElementException(format(
                        "Review with id ''{0}'' and user id ''{1}'' doesn't exist", reviewId, userId
                ))
        );
    }

    public Review getReview(String reviewId) {
        return reviewRepository.findById(reviewId).orElseThrow(() ->
                new NoSuchElementException(format("Review ''{0}'' doesn't exist", reviewId))
        );
    }

    public Page<Review> getReviews(ReviewsCriteria criteria, Pageable pageable) {
        return reviewRepository.findAll(ReviewSpecifications.getAll(criteria), pageable);
    }

    public Boolean existsByResourceIdAndUserId(String resourceId, String userId) {
        return reviewRepository.existsByResourceIdAndUserId(resourceId, userId);
    }

    public Boolean existsByIdAndUserId(String id, String userId) {
        return reviewRepository.existsByIdAndUserId(id, userId);
    }

    /**
     * Check existence of resource by {@link ResourceType} and resource ID.
     *
     * @param resourceId resource ID
     * @param resourceType resource type
     * @return existence flag
     */
    public Boolean isResourceExists(String resourceId, ResourceType resourceType) {
        return switch (resourceType) {
            case PAGE -> pagesService.existsById(resourceId);
            case SITE -> domainService.existsById(resourceId);
            default -> throw new IllegalArgumentException("Bad resource type: " + resourceType);
        };
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
        String userId = newReview.getUser().getId();

        if (!isResourceExists(resourceId, newReview.getResourceType())) {
            throw new NoSuchElementException(format("Resource ''{0}'' ({1}) doesn't exist.", userId, newReview.getResourceType()));
        }

        if (existsByResourceIdAndUserId(resourceId, userId)) {
            throw new EntityAlreadyExistException(format(
                    "User ''{0}'' already left review for resource ''{1}''", userId, resourceId
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

    /**
     * Remove review, which was left by user.
     *
     * @param reviewId review ID
     * @param userId user ID
     */
    @Transactional
    public void removeReview(String reviewId, String userId) {
        if (!existsByIdAndUserId(reviewId, userId)) {
            throw new NoSuchElementException(format(
                    "Review ''{0}'' from user ''{1}'' doesn't exist.", reviewId, userId
            ));
        }

        reviewRepository.deleteById(reviewId);
    }
}
