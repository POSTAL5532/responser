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

    @Enumerated(EnumType.STRING)
    @Column(name = "resource_type")
    private ResourceType resourceType;

    @Column(name = "resource_id")
    private String resourceId;

    @Column(name = "review_id")
    private String reviewId;

    private Byte rating;

    private String text;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "review", fetch = FetchType.EAGER)
    private Set<ReviewLike> likes;
}
