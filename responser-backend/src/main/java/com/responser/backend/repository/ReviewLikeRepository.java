package com.responser.backend.repository;

import com.responser.backend.model.ReviewLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * ReviewLikeRepository
 *
 * @author SIE
 */
@Repository
public interface ReviewLikeRepository extends JpaRepository<ReviewLike, String> {

    Boolean existsByReviewIdAndUserId(String reviewId, String userId);

    Boolean existsByIdAndUserId(String likeId, String userId);

    Optional<ReviewLike> findByIdAndUserId(String id, String userId);
}
