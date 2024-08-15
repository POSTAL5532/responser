package space.reviewly.backend.service.user;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;
import space.reviewly.backend.model.user.User;
import space.reviewly.backend.model.user.UserCriteria;
import space.reviewly.backend.model.user.User_;

@RequiredArgsConstructor
public class UserSpecification implements Specification<User> {

    private final UserCriteria criteria;

    @Override
    public Predicate toPredicate(@NonNull Root<User> userRoot, @NonNull CriteriaQuery<?> criteriaQuery, @NonNull CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        if (criteria.hasId()) {
            predicates.add(criteriaBuilder.equal(userRoot.get(User_.ID), criteria.getId()));
        }

        if (criteria.hasFullName()) {
            predicates.add(criteriaBuilder.equal(
                criteriaBuilder.lower(userRoot.get(User_.FULL_NAME)), criteria.getFullName().toLowerCase()
            ));
        }

        if (criteria.hasRegisteredBy()) {
            predicates.add(criteriaBuilder.equal(userRoot.get(User_.REGISTERED_BY), criteria.getRegisteredBy()));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
