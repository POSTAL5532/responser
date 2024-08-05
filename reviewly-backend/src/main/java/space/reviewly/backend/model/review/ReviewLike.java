package space.reviewly.backend.model.review;

import jakarta.persistence.*;
import lombok.*;
import space.reviewly.backend.model.AbstractEntity;

/**
 * Response like
 *
 * @author Shcherbachenya Igor
 */
@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "reviews_likes")
public class ReviewLike extends AbstractEntity {

    @Column(name = "user_id")
    private String userId;

    @Column(name = "review_id")
    private String reviewId;

    private Boolean positive;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id", nullable = false, insertable = false, updatable = false)
    private Review review;
}
