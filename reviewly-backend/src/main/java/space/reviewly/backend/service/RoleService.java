package space.reviewly.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import space.reviewly.backend.model.user.Role;
import space.reviewly.backend.model.user.RoleName;
import space.reviewly.backend.repository.RoleRepository;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class RoleService {

    private final RoleRepository repository;

    public Role getByName(RoleName name) {
        return repository.findByName(name).orElse(null);
    }

    public Role getDefaultRole() {
        return getByName(RoleName.USER);
    }
}
