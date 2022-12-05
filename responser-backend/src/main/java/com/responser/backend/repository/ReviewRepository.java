package com.responser.backend.repository;

import com.responser.backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * ReviewRepository
 *
 * @author SIE
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {

    List<Review> findAllByResourceId(String resourceId);

    Optional<Review> findByIdAndUserId(String reviewId, String userId);
}
