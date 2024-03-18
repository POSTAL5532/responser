package space.reviewly.backend.service.webResource;

import space.reviewly.backend.model.Review;
import space.reviewly.backend.model.Review_;
import space.reviewly.backend.model.WebResource;
import space.reviewly.backend.model.WebResourceCriteria;
import space.reviewly.backend.model.WebResourceCriteriaSortingField;
import space.reviewly.backend.model.WebResource_;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;

@RequiredArgsConstructor
public class WebResourceSpecification implements Specification<WebResource> {

    private final WebResourceCriteria criteria;

    @Override
    public Predicate toPredicate(
        @NonNull Root<WebResource> webResourceRoot,
        @NonNull CriteriaQuery<?> criteriaQuery,
        @NonNull CriteriaBuilder criteriaBuilder
    ) {
        List<Predicate> predicates = new ArrayList<>();

        if (criteria.hasSearchUrl()) {
            predicates.add(criteriaBuilder.like(webResourceRoot.get(WebResource_.URL), "%" + criteria.getSearchUrl().trim() + "%"));
        }

        if (criteria.hasResourceType()) {
            predicates.add(criteriaBuilder.equal(webResourceRoot.get(WebResource_.RESOURCE_TYPE), criteria.getResourceType()));
        }

        Join<WebResource, Review> reviewsJoin = webResourceRoot.join(WebResource_.REVIEWS, JoinType.LEFT);
        Expression<Double> ratingAvgExpression = criteriaBuilder.avg(reviewsJoin.get(Review_.RATING));

        if (criteria.hasWithReviews()) {
            Expression<Long> reviewsCountExpression = criteriaBuilder.count(reviewsJoin);

            if (criteria.getWithReviews()) {
                criteriaQuery.having(criteriaBuilder.greaterThanOrEqualTo(reviewsCountExpression, 1L));
            } else {
                criteriaQuery.having(criteriaBuilder.equal(reviewsCountExpression, 0L));
            }
        }

        if (criteria.hasRatingRange()) {
            if (criteria.hasMinRating() && criteria.hasMaxRating()) {
                criteriaQuery.having(criteriaBuilder.and(
                    criteriaBuilder.greaterThanOrEqualTo(ratingAvgExpression, criteria.getMinRating().doubleValue()),
                    criteriaBuilder.lessThanOrEqualTo(ratingAvgExpression, criteria.getMaxRating().doubleValue())
                ));
            } else {
                criteriaQuery.having(
                    criteria.hasMinRating()
                        ? criteriaBuilder.greaterThanOrEqualTo(ratingAvgExpression, criteria.getMinRating().doubleValue())
                        : criteriaBuilder.lessThanOrEqualTo(ratingAvgExpression, criteria.getMaxRating().doubleValue())
                );
            }
        }

        if (criteria.hasSortingField()) {
            Expression<?> sortExpression;

            if (criteria.getSortingField().equals(WebResourceCriteriaSortingField.RATING)) {
                sortExpression = ratingAvgExpression;
            } else {
                sortExpression = webResourceRoot.get(criteria.getSortingField().getFieldName());
            }

            Order sortOrder = !criteria.hasSortingDirection() || criteria.getSortDirection().isAscending()
                ? criteriaBuilder.asc(sortExpression)
                : criteriaBuilder.desc(sortExpression);

            criteriaQuery.orderBy(sortOrder);
        }

        criteriaQuery.groupBy(webResourceRoot.get(WebResource_.ID));

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
