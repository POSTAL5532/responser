package com.responser.backend.service.review;

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
 * ResponsesService
 *
 * @author SIE
 */
@AllArgsConstructor
@Service
@Transactional(readOnly = true)
public class ReviewService {

    private final ReviewRepository reviewRepository;

    private final UserService userService;

    public Review getResponseByIdAndUser(String responseId, String userId) {
        return reviewRepository.findByIdAndUserId(responseId, userId).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format(
                        "Response with id ''{0}'' and user id ''{1}'' doesn't exist",
                        responseId,
                        userId
                ))
        );
    }

    public List<Review> getReviews(ReviewsCriteria criteria) {
        return reviewRepository.findAll(ReviewSpecifications.getAll(criteria));
    }

    @Transactional
    public Review createReview(Review newReview) {
        User referenceUser = userService.getUser(newReview.getUser().getId());
        newReview.setUser(referenceUser);
        return reviewRepository.save(newReview);
    }

    @Transactional
    public Review updateReview(Review review) {
        Review oldReview = this.getResponseByIdAndUser(review.getId(), review.getUser().getId());
        oldReview.setText(review.getText());
        oldReview.setRating(review.getRating());

        return reviewRepository.save(oldReview);
    }
}
