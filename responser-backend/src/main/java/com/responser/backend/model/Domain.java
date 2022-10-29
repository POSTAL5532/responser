package com.responser.backend.model;

import lombok.*;

import javax.persistence.*;

/**
 * Domain
 *
 * @author SIE
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@RequiredArgsConstructor
@Entity
@Table(name = "domains")
public class Domain extends AbstractEntity {

    private String domain;

    private String name;

    private String description;

    @Column(name = "has_ssl")
    private Boolean hasSsl;
}
