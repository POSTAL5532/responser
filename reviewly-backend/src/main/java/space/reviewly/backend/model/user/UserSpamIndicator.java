package space.reviewly.backend.model.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import space.reviewly.backend.model.AbstractEntity;

/**
 * UserSpamIndicator
 *
 * @author Shcherbachenya Igor
 */
@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "user_spam_indicator")
public class UserSpamIndicator extends AbstractEntity {

    @Column(name = "user_id")
    private String userId;

    @Column(name = "spam_counter")
    private Integer spamCounter;
}
