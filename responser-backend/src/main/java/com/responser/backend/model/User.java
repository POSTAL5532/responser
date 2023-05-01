package com.responser.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

/**
 * User
 *
 * @author Shcherbachenya Igor
 */
@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "users")
public class User extends AbstractEntity {

    @Column(name = "user_name")
    private String userName;

    private String email;

    private String password;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "email_confirmed")
    private Boolean emailConfirmed;
}
