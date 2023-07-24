package com.responser.backend.repository;

import com.responser.backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Review repository
 *
 * @author Shcherbachenya Igor
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, String>, JpaSpecificationExecutor<Review> {

    Optional<Review> findByIdAndUserId(String reviewId, String userId);

    Boolean existsByResourceIdAndUserId(String resourceId, String userId);

    Boolean existsByIdAndUserId(String id, String userId);

    @Query("select avg(r.rating) from Review r where r.resourceId=:resourceId")
    Double getRatingByResourceId(String resourceId);

    @Query("select count(*) from Review r where r.resourceId=:resourceId")
    Long getReviewsCountByResourceId(String resourceId);
}
