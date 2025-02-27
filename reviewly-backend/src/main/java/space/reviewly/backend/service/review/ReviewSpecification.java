package space.reviewly.backend.service.review;

import space.reviewly.backend.model.review.Review;
import space.reviewly.backend.model.review.ReviewLike;
import space.reviewly.backend.model.review.ReviewLike_;
import space.reviewly.backend.model.review.Review_;
import space.reviewly.backend.model.review.ReviewsCriteria;
import space.reviewly.backend.model.review.ReviewsCriteriaResourceType;
import space.reviewly.backend.model.review.ReviewsCriteriaSortingField;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;
import space.reviewly.backend.model.user.User_;
import space.reviewly.backend.model.webresource.WebResource_;

@RequiredArgsConstructor
public class ReviewSpecification implements Specification<Review> {

    private final ReviewsCriteria criteria;

    @Override
    public Predicate toPredicate(@NonNull Root<Review> reviewRoot, @NonNull CriteriaQuery<?> criteriaQuery, @NonNull CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        boolean isCountQuery = processCountQuery(reviewRoot, criteriaQuery);

        if (criteria.hasResourceId()) {
            Predicate resourceIdPredicate;

            if (criteria.hasResourceType() && (criteria.getResourceType().equals(ReviewsCriteriaResourceType.ALL) || criteria.getResourceType().equals(ReviewsCriteriaResourceType.PAGE))) {
                resourceIdPredicate = criteriaBuilder.or(
                    criteriaBuilder.equal(reviewRoot.get(Review_.RESOURCE_ID), criteria.getResourceId()),
                    criteriaBuilder.equal(reviewRoot.get(Review_.WEB_RESOURCE).get(WebResource_.PARENT_ID), criteria.getResourceId())
                );
            } else {
                resourceIdPredicate = criteriaBuilder.equal(reviewRoot.get(Review_.RESOURCE_ID), criteria.getResourceId());
            }

            predicates.add(resourceIdPredicate);
        }

        if (criteria.hasForUserId()) {
            predicates.add(criteriaBuilder.equal(reviewRoot.get(Review_.USER).get(User_.ID), criteria.getForUserId()));
        }

        if (criteria.hasExcludeUserId()) {
            predicates.add(criteriaBuilder.notEqual(reviewRoot.get(Review_.USER).get(User_.ID), criteria.getExcludeUserId()));
        }

        if (criteria.hasMinRating()) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(reviewRoot.get(Review_.RATING), criteria.getMinRating()));
        }

        if (criteria.hasMaxRating()) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(reviewRoot.get(Review_.RATING), criteria.getMaxRating()));
        }

        if (criteria.hasResourceType() && !criteria.getResourceType().equals(ReviewsCriteriaResourceType.ALL)) {
            predicates.add(criteriaBuilder.equal(reviewRoot.get(Review_.WEB_RESOURCE).get(WebResource_.RESOURCE_TYPE), criteria.getResourceType()));
        }

        if (criteria.hasSearchUrl()) {
            predicates.add(criteriaBuilder.like(reviewRoot.get(Review_.WEB_RESOURCE).get(WebResource_.URL), "%" + criteria.getSearchUrl().trim() + "%"));
        }

        if (criteria.hasSortingField() && !isCountQuery) {
            Order sortOrder = getSortingOrder(reviewRoot, criteriaQuery, criteriaBuilder, criteria.getSortingField(), criteria.getSortDirection());
            criteriaQuery.orderBy(sortOrder);
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }

    public Order getSortingOrder(
        Root<Review> reviewRoot,
        CriteriaQuery<?> criteriaQuery,
        CriteriaBuilder criteriaBuilder,
        ReviewsCriteriaSortingField sortField,
        Direction sortDirection
    ) {
        Expression<?> sortExpression;

        if (sortField == ReviewsCriteriaSortingField.POPULARITY) {
            Subquery<Long> subquery = criteriaQuery.subquery(Long.class);
            Root<ReviewLike> likesRoot = subquery.from(ReviewLike.class);
            subquery.select(criteriaBuilder.count(likesRoot));

            subquery.where(criteriaBuilder.and(
                criteriaBuilder.equal(likesRoot.get(ReviewLike_.REVIEW), reviewRoot),
                criteriaBuilder.isTrue(likesRoot.get(ReviewLike_.POSITIVE))
            ));

            sortExpression = subquery;
        } else {
            sortExpression = reviewRoot.get(sortField.getFieldName());
        }

        return ObjectUtils.isEmpty(sortDirection) || sortDirection.isAscending()
            ? criteriaBuilder.asc(sortExpression)
            : criteriaBuilder.desc(sortExpression);
    }

    /**
     * Spring Data JPA throws an exception if it has pagination with join fetch. So it disable join fetch if it just <code>COUNT(*)</code>.
     *
     * @return flag about this query is <code>COUNT(*)</code> for pagination.
     */
    public boolean processCountQuery(Root<Review> reviewRoot, CriteriaQuery<?> criteriaQuery) {
        boolean isCountQuery = criteriaQuery.getResultType() == Long.class || criteriaQuery.getResultType() == long.class;

        if (isCountQuery) {
            reviewRoot.join(Review_.WEB_RESOURCE);
            reviewRoot.join(Review_.USER);
        } else {
            reviewRoot.fetch(Review_.LIKES, JoinType.LEFT);
            reviewRoot.fetch(Review_.WEB_RESOURCE);
            reviewRoot.fetch(Review_.USER);
        }

        return isCountQuery;
    }
}
