package com.responser.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "email_confirmations")
public class EmailConfirmation extends AbstractEntity{

    @Column(name = "user_id")
    private String userId;
}
