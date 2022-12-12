package com.responser.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

/**
 * Response
 *
 * @author SIE
 */
@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "reviews")
public class Review extends AbstractEntity{

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "resource_id")
    private String resourceId;

    @Column(name = "review_id")
    private String reviewId;

    private Byte rating;

    private String text;

    @OneToMany(mappedBy = "review", fetch = FetchType.EAGER)
    private Set<ReviewLike> likes;
}
