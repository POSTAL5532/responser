package space.reviewly.backend.repository;

import space.reviewly.backend.model.review.ReviewLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Review like repository
 *
 * @author Shcherbachenya Igor
 */
@Repository
public interface ReviewLikeRepository extends JpaRepository<ReviewLike, String> {

    Boolean existsByReviewIdAndUserId(String reviewId, String userId);

    Boolean existsByIdAndUserId(String likeId, String userId);

    Optional<ReviewLike> findByIdAndUserId(String id, String userId);
}
