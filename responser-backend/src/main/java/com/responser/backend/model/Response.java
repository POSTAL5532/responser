package com.responser.backend.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

/**
 * Response
 *
 * @author SIE
 */
@Entity
@Table(name = "responses")
@Data
@EqualsAndHashCode(callSuper = true)
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
