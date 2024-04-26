package space.reviewly.backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import space.reviewly.backend.model.user.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {

    Optional<Role> findByName(String name);
}
