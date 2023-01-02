package com.responser.backend.model;

import jakarta.persistence.*;
import lombok.*;

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

    private Boolean positive;

    @ManyToOne
    @JoinColumn(name = "review_id", nullable = false)
    private Review review;
}
