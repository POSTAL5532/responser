package com.responser.backend.repository;

import com.responser.backend.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * ResourceRepository
 *
 * @author SIE
 */
@Repository
public interface ResourceRepository extends JpaRepository<Resource, String> {
}
