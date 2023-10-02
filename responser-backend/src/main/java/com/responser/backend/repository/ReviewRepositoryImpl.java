package com.responser.backend.repository;

import com.blazebit.persistence.CriteriaBuilder;
import com.blazebit.persistence.CriteriaBuilderFactory;
import com.responser.backend.model.Review;
import com.responser.backend.model.Review_;
import com.responser.backend.model.metamodel.ReviewMetaModel;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

/**
 * Review repository
 *
 * @author Shcherbachenya Igor
 */
@Repository
@RequiredArgsConstructor
public class ReviewRepositoryImpl {

    @PersistenceContext
    private EntityManager entityManager;

    private final CriteriaBuilderFactory criteriaBuilderFactory;

    public Optional<Review> findById(String id) {
        CriteriaBuilder<Review> criteriaBuilder = criteriaBuilderFactory.create(entityManager, Review.class, ReviewMetaModel.ALIAS)
            .where(ReviewMetaModel.getFromAlias(Review_.ID)).eq(id)
            .leftJoinFetch(ReviewMetaModel.getFromAlias(Review_.WEB_RESOURCE), Review_.WEB_RESOURCE)
            .leftJoinFetch(ReviewMetaModel.getFromAlias(Review_.USER), Review_.USER)
            .leftJoinFetch(ReviewMetaModel.getFromAlias(Review_.LIKES), Review_.LIKES);

        return Optional.ofNullable(criteriaBuilder.getSingleResult());
    }

    public Optional<Review> findByIdAndUserId(String reviewId, String userId) {
        CriteriaBuilder<Review> criteriaBuilder = criteriaBuilderFactory.create(entityManager, Review.class, ReviewMetaModel.ALIAS)
            .where(ReviewMetaModel.getFromAlias(ReviewMetaModel.ID)).eq(reviewId)
            .where(ReviewMetaModel.getFromAlias(ReviewMetaModel.USER_ID)).eq(userId);

        return Optional.ofNullable(criteriaBuilder.getSingleResult());
    }

    public Boolean existsByResourceIdAndUserId(String resourceId, String userId) {
        CriteriaBuilder<Review> criteriaBuilder = criteriaBuilderFactory.create(entityManager, Review.class, ReviewMetaModel.ALIAS)
        .where(ReviewMetaModel.getFromAlias(ReviewMetaModel.RESOURCE_ID)).eq(resourceId)
        .where(ReviewMetaModel.getFromAlias(ReviewMetaModel.USER_ID)).eq(userId);

        return Objects.nonNull(criteriaBuilder.getSingleResult());
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
