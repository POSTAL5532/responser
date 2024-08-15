package space.reviewly.backend.service.review;

import java.time.LocalDateTime;
import space.reviewly.backend.exceptions.EntityAlreadyExistException;
import space.reviewly.backend.model.review.ReviewSource;
import space.reviewly.backend.model.review.ReviewsCriteria;
import space.reviewly.backend.model.review.Review;
import space.reviewly.backend.model.user.User;
import space.reviewly.backend.repository.ReviewRepository;
import space.reviewly.backend.service.user.UserService;
import space.reviewly.backend.service.user.UserSpamIndicatorService;
import space.reviewly.backend.service.webResource.WebResourceService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static java.text.MessageFormat.*;

import java.util.NoSuchElementException;
import space.reviewly.backend.utils.UrlUtils;

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

    private final UserService userService;

    private final WebResourceService webResourceService;

    private final UserSpamIndicatorService userSpamIndicatorService;

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
        return reviewRepository.findAll(new ReviewSpecification(criteria), pageable);
    }

    public Boolean existsByResourceIdAndUserId(String resourceId, String userId) {
        return reviewRepository.existsByResourceIdAndUserId(resourceId, userId);
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

        User user = userService.getUser(userId);

        if (!user.getEmailConfirmed()) {
            throw new IllegalArgumentException(format("User {0} didn't confirm email.", userId));
        }

        if (!isResourceExists(resourceId)) {
            throw new NoSuchElementException(format("Resource ''{0}'' doesn't exist.", resourceId));
        }

        if (existsByResourceIdAndUserId(resourceId, userId)) {
            throw new EntityAlreadyExistException(format(
                "User ''{0}'' already left review for resource ''{1}''", userId, resourceId
            ));
        }

        if (isContainsURL(newReview.getText())) {
            userSpamIndicatorService.incrementOrCreateAndIncrementIndicator(user.getId());
        }

        newReview.setUser(user);

        if (newReview.getSource() == null) {
            newReview.setSource(ReviewSource.REVIEWLY);
        }

        return reviewRepository.save(newReview);
    }

    @Transactional
    public Review updateReview(Review updateReview) {
        User user = userService.getUser(updateReview.getUserId());

        if (!user.getEmailConfirmed()) {
            throw new IllegalArgumentException(format("User {0} didn't confirm email.", updateReview.getUserId()));
        }

        Review oldReview = this.getReviewByIdAndUser(updateReview.getId(), updateReview.getUserId());

        if (isContainsURL(updateReview.getText())) {
            userSpamIndicatorService.incrementOrCreateAndIncrementIndicator(user.getId());
        }

        oldReview.setText(updateReview.getText());
        oldReview.setRating(updateReview.getRating());

        return reviewRepository.save(oldReview);
    }

    @Transactional
    public Review updateReviewCreationDate(String id, LocalDateTime newDate) {
        Review review = getReview(id);
        review.setCreationDate(newDate);
        return reviewRepository.save(review);
    }

    /**
     * Remove review, which was left by user.
     *
     * @param reviewId review ID
     * @param userId user ID
     */
    @Transactional
    public void removeReview(String reviewId, String userId) {
        Review review = reviewRepository.findByIdAndUserId(reviewId, userId)
            .orElseThrow(() -> new NoSuchElementException(format(
                    "Review ''{0}'' from user ''{1}'' doesn't exist.", reviewId, userId
                ))
            );

        reviewRepository.delete(review);
    }

    public static boolean isContainsURL(String text) {
        return UrlUtils.WEB_URL_PATTERN.matcher(text).find();
    }
}
