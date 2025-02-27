package space.reviewly.backend.repository;

import space.reviewly.backend.model.EmailConfirmation;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailConfirmationRepository extends JpaRepository<EmailConfirmation, String> {

    Optional<EmailConfirmation> findByUserId(String userId);

    Boolean existsByUserId(String userId);
}
