package com.responser.backend.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

/**
 * Domain
 *
 * @author SIE
 */
@Entity
@Table(name = "domains")
@Data
@EqualsAndHashCode(callSuper = true)
public class Domain extends AbstractEntity {

    private String domain;

    private String name;

    private String description;

    @Column(name = "has_ssl")
    private Boolean hasSsl;
}
