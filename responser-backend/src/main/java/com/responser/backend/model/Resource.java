package com.responser.backend.model;

import lombok.*;

import javax.persistence.*;

/**
 * Resource
 *
 * @author SIE
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
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
