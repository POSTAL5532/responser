package com.responser.backend.service.review;

import com.responser.backend.model.*;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

/**
 * Util class for creating a {@link Specification} for {@link Review} entities selection.
 */
public class ReviewSpecifications {

    public static Specification<Review> getAll(ReviewsCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.isNotBlank(criteria.getResourceId())) {
                predicates.add(criteriaBuilder.equal(root.get(Review_.RESOURCE_ID), criteria.getResourceId()));
            }

            Join<Review, User> userRoot = root.join(Review_.USER, JoinType.INNER);

            if (StringUtils.isNotBlank(criteria.getForUserId())) {
                predicates.add(criteriaBuilder.equal(userRoot.get(User_.ID), criteria.getForUserId()));
            }

            if (StringUtils.isNotBlank(criteria.getExcludeUserId())) {
                predicates.add(criteriaBuilder.notEqual(userRoot.get(User_.ID), criteria.getExcludeUserId()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
