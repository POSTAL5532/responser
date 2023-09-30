package com.responser.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

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

    @ManyToOne
    @JoinColumn(name = "resource_id", nullable = false, insertable = false, updatable = false)
    private WebResource webResource;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, insertable = false, updatable = false)
    private User user;

    @OneToMany(mappedBy = "review", fetch = FetchType.EAGER)
    private Set<ReviewLike> likes;
}
