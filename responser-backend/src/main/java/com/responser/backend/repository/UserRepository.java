package com.responser.backend.repository;

import com.responser.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * User repository
 *
 * @author Shcherbachenya Igor
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByUserName(String userName);

    Boolean existsByEmail(String email);

    Boolean existsByUserName(String userName);
}
