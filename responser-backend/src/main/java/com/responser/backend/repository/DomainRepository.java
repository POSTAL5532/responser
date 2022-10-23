package com.responser.backend.repository;

import com.responser.backend.model.Domain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * DomainRepository
 *
 * @author SIE
 */
@Repository
public interface DomainRepository extends JpaRepository<Domain, String> {
}
