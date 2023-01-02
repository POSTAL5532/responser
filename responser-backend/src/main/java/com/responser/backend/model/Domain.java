package com.responser.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

/**
 * Domain
 *
 * @author Shcherbachenya Igor
 */
@Getter
@Setter
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
    private Set<Page> pages;
}
