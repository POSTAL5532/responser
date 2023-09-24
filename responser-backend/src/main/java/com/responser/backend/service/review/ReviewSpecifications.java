package com.responser.backend.service.review;

import com.responser.backend.model.Review;
import com.responser.backend.model.ReviewLike;
import com.responser.backend.model.ReviewLike_;
import com.responser.backend.model.Review_;
import com.responser.backend.model.ReviewsCriteria;
import com.responser.backend.model.ReviewsCriteriaSortingField;
import com.responser.backend.model.User;
import com.responser.backend.model.User_;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.SetJoin;
import java.util.Objects;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

/**
 * Util class for creating a {@link Specification} for {@link Review} entities selection.
 */
public class ReviewSpecifications {

    public static Specification<Review> getAll(ReviewsCriteria criteria) {
        return (Root<Review> reviewRoot, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.isNotBlank(criteria.getResourceId())) {
                predicates.add(criteriaBuilder.equal(reviewRoot.get(Review_.RESOURCE_ID), criteria.getResourceId()));
            }

            Join<Review, User> userJoin = reviewRoot.join(Review_.USER, JoinType.INNER);
            if (StringUtils.isNotBlank(criteria.getForUserId())) {
                predicates.add(criteriaBuilder.equal(userJoin.get(User_.ID), criteria.getForUserId()));
            }

            if (StringUtils.isNotBlank(criteria.getExcludeUserId())) {
                predicates.add(criteriaBuilder.notEqual(userJoin.get(User_.ID), criteria.getExcludeUserId()));
            }

            ReviewsCriteriaSortingField sortField = criteria.getSortingField();
            if (Objects.nonNull(sortField)) {
                Order sortOrder = getSortingOrder(reviewRoot, criteriaQuery, criteriaBuilder, sortField, criteria.getSortDirection());
                criteriaQuery.orderBy(sortOrder);
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static Order getSortingOrder(
        Root<Review> reviewRoot,
        CriteriaQuery<?> criteriaQuery,
        CriteriaBuilder criteriaBuilder,
        ReviewsCriteriaSortingField sortField,
        Direction sortDirection
    ) {
        Expression<?> sortExpression;

        if (sortField == ReviewsCriteriaSortingField.POPULARITY) {
            SetJoin<Review, ReviewLike> reviewLikeJoin = reviewRoot.joinSet(Review_.LIKES);

            sortExpression = criteriaBuilder.sum(
                criteriaBuilder.<Integer>selectCase()
                    .when(criteriaBuilder.equal(reviewLikeJoin.get(ReviewLike_.POSITIVE), true), 1)
                    .otherwise(0)
            );

            criteriaQuery.groupBy(reviewRoot.get(Review_.ID));
        } else {
            sortExpression = reviewRoot.get(sortField.getFieldName());
        }

        return  ObjectUtils.isEmpty(sortDirection) || sortDirection.isAscending()
            ? criteriaBuilder.asc(sortExpression)
            : criteriaBuilder.desc(sortExpression);
    }
}
