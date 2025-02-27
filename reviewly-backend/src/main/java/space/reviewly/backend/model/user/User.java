package space.reviewly.backend.model.user;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.util.HashSet;
import java.util.Set;
import lombok.*;
import space.reviewly.backend.model.AbstractEntity;

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

    private String email;

    private String password;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "avatar_file_name")
    private String avatarFileName;

    @Column(name = "email_confirmed")
    private Boolean emailConfirmed;

    @Enumerated(EnumType.STRING)
    @Column(name = "registered_by")
    private RegisteredBy registeredBy;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinTable(name = "user_role",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
}
