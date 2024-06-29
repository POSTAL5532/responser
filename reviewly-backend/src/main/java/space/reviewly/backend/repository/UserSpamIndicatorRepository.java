package space.reviewly.backend.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import space.reviewly.backend.model.user.UserSpamIndicator;

@Repository
public interface UserSpamIndicatorRepository extends JpaRepository<UserSpamIndicator, String> {

    Optional<UserSpamIndicator> findByUserId(String userId);

    List<UserSpamIndicator> findByUserIdIn(List<String> userIds);
}
