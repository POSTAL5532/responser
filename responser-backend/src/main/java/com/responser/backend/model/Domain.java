package com.responser.backend.model;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

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

    @OneToMany(mappedBy = "domain", fetch = FetchType.LAZY)
    private Set<Resource> resources;
}
