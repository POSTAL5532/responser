package com.responser.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

/**
 * Resource
 *
 * @author SIE
 */
@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "resources")
public class Resource extends AbstractEntity {

    private String url;

    private String name;

    private String description;

    @ManyToOne
    @JoinColumn(name = "domain_id", nullable = false)
    private Domain domain;
}
