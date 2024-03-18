package space.reviewly.backend.repository;

import space.reviewly.backend.model.Review;
import jakarta.annotation.Nonnull;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

/**
 * Review repository
 *
 * @author Shcherbachenya Igor
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, String>, JpaSpecificationExecutor<Review> {

    @NonNull
    @Query("""
        select r from Review r
        join fetch r.user
        join fetch r.webResource
        left join fetch r.likes
        where r.id=:id
        """)
    Optional<Review> findById(@Nonnull String id);

    @Query("""
        select r from Review r
        join fetch r.user
        join fetch r.webResource
        left join fetch r.likes
        where r.id=:reviewId and r.user.id=:userId
        """)
    Optional<Review> findByIdAndUserId(String reviewId, String userId);

    Boolean existsByResourceIdAndUserId(String resourceId, String userId);

    Boolean existsByIdAndUserId(String id, String userId);
}
