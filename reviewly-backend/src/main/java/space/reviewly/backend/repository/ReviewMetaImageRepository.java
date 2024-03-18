package space.reviewly.backend.repository;

import space.reviewly.backend.model.ReviewMetaImage;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewMetaImageRepository extends JpaRepository<ReviewMetaImage, String> {

    Optional<ReviewMetaImage> findByReviewId(String reviewId);
}
