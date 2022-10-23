package com.responser.backend.model;

import javax.persistence.*;

/**
 * Domain
 *
 * @author SIE
 */
@Entity
@Table(name = "domains")
public class Domain extends AbstractEntity {

    private String domain;

    private String name;

    private String description;
}
