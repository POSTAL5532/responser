package com.responser.backend.model;

import javax.persistence.*;

/**
 * Resource
 *
 * @author SIE
 */
@Entity
@Table(name = "resources")
public class Resource extends AbstractEntity {

    @Column(name = "domain_id")
    private String domainId;

    private String url;

    private String name;

    private String description;
}
