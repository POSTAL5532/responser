package com.responser.backend.repository;

import com.responser.backend.model.Domain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Domain repository
 *
 * @author Shcherbachenya Igor
 */
@Repository
public interface DomainRepository extends JpaRepository<Domain, String> {

    Optional<Domain> findByDomain(String domain);

    @Query("select avg(r.rating) from Review r join Domain d on r.resourceId=d.id and d.id=:domainId and r.resourceType='SITE'")
    Double commonRating(String domainId);
}
