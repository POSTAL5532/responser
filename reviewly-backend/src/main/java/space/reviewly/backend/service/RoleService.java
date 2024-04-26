package space.reviewly.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import space.reviewly.backend.model.user.Role;
import space.reviewly.backend.repository.RoleRepository;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class RoleService {

    public static final String DEFAULT_ROLE = "USER";

    private final RoleRepository repository;

    public Role getByName(String name) {
        if (!StringUtils.hasText(name)) {
            return null;
        }

        return repository.findByName(name).orElse(null);
    }

    public Role getDefaultRole() {
        return getByName(DEFAULT_ROLE);
    }
}
