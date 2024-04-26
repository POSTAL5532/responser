package space.reviewly.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;
import space.reviewly.backend.model.user.User;

/**
 * Review
 *
 * @author Shcherbachenya Igor
 */
@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "reviews")
public class Review extends AbstractEntity {

    @Column(name = "user_id")
    private String userId;

    @Column(name = "resource_id")
    private String resourceId;

    @Column(name = "review_id")
    private String reviewId;

    private Byte rating;

    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resource_id", nullable = false, insertable = false, updatable = false)
    private WebResource webResource;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, insertable = false, updatable = false)
    private User user;

    @OneToMany(mappedBy = "review", fetch = FetchType.LAZY)
    private Set<ReviewLike> likes;
}
