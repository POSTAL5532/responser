package com.responser.backend.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

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
@Data
@EqualsAndHashCode(callSuper = true)
public class ResponseLike extends AbstractEntity {

    @Column(name = "user_id")
    private String userId;

    @Column(name = "response_id")
    private String responseId;

    private Boolean positive;
}
