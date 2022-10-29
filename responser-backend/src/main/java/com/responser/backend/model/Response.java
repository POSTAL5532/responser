package com.responser.backend.model;

import lombok.*;

import javax.persistence.*;

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

    @Column(name = "user_id")
    private String userId;

    @Column(name = "resource_id")
    private String resourceId;

    @Column(name = "response_id")
    private String responseId;

    private Byte rating;

    private String text;
}
