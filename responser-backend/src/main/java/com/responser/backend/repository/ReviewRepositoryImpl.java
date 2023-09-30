package com.responser.backend.repository;

import com.responser.backend.model.Review;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import java.util.Objects;
import java.util.Optional;
import org.springframework.stereotype.Repository;

/**
 * Review repository
 *
 * @author Shcherbachenya Igor
 */
@Repository
public class ReviewRepositoryImpl {

    @PersistenceContext
    private EntityManager entityManager;

    public Optional<Review> findById(String id) {
        Review review = entityManager.find(Review.class, id);
        return Optional.ofNullable(review);
    }

    public Optional<Review> findByIdAndUserId(String reviewId, String userId) {
        TypedQuery<Review> query = entityManager.createQuery(
                "from Review review where review.id = :reviewId and review.user.id = :userId", Review.class
            )
            .setParameter("reviewId", reviewId)
            .setParameter("userId", userId);

        try {
            return Optional.of(query.getSingleResult());
        } catch (NoResultException exception) {
            return Optional.empty();
        }
    }

    public Boolean existsByResourceIdAndUserId(String resourceId, String userId) {
        TypedQuery<Review> query = entityManager.createQuery(
                "from Review review where review.user.id = :userId and review.resourceId = :resourceId", Review.class
            )
            .setParameter("userId", userId)
            .setParameter("resourceId", resourceId);

        try {
            return Objects.nonNull(query.getSingleResult());
        } catch (NoResultException exception) {
            return false;
        }
    }

    public Review update(Review review) {
        return entityManager.merge(review);
    }

    public Review save(Review review) {
        entityManager.persist(review);
        return review;
    }

    public void delete(Review review) {
        entityManager.remove(review);
    }
}
