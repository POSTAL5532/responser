package com.responser.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * ResponseLike
 *
 * @author SIE
 */
@Entity
@Table(name = "responses_likes")
public class ResponseLike extends AbstractEntity {

    @Column(name = "user_id")
    private String userId;

    @Column(name = "response_id")
    private String responseId;

    private Boolean positive;
}
