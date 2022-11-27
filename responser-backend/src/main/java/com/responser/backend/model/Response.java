package com.responser.backend.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * Response
 *
 * @author SIE
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@RequiredArgsConstructor
@Entity
@Table(name = "responses")
public class Response extends AbstractEntity{

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "resource_id")
    private String resourceId;

    @Column(name = "response_id")
    private String responseId;

    private Byte rating;

    private String text;
}
