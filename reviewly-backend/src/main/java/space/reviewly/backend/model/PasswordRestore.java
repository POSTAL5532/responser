package space.reviewly.backend.model;

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
@Table(name = "password_restores")
public class PasswordRestore extends AbstractEntity {

    @Column(name = "user_id")
    private String userId;
}
