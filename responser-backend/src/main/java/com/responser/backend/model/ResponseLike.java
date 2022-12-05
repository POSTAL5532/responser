package com.responser.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

/**
 * ResponseLike
 *
 * @author SIE
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@RequiredArgsConstructor
@Entity
@Table(name = "reviews_likes")
public class ResponseLike extends AbstractEntity {

    @Column(name = "user_id")
    private String userId;

    @Column(name = "review_id")
    private String reviewId;

    private Boolean positive;
}
