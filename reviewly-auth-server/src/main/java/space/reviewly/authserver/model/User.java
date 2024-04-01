package space.reviewly.authserver.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import org.hibernate.annotations.GenericGenerator;

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
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
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

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
}
