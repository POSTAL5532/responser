package space.reviewly.authserver.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

/**
 * User
 *
 * @author Shcherbachenya Igor
 */
@RequiredArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(columnDefinition = "CHAR(36)")
    private String id;

    private String email;

    private String password;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "email_confirmed")
    private Boolean emailConfirmed;

    @Column(name = "creation_date")
    @CreationTimestamp
    private LocalDateTime creationDate;

    @Column(name = "update_date")
    @CreationTimestamp
    private LocalDateTime updateDate;
}
