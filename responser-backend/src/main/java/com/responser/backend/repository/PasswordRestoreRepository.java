package com.responser.backend.repository;

import com.responser.backend.model.PasswordRestore;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordRestoreRepository extends JpaRepository<PasswordRestore, String> {

    Optional<PasswordRestore> findByUserId(String userId);

    Boolean existsByUserId(String userId);
}
