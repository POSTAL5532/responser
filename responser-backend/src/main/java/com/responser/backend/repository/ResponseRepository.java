package com.responser.backend.repository;

import com.responser.backend.model.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * ResponseRepository
 *
 * @author SIE
 */
@Repository
public interface ResponseRepository extends JpaRepository<Response, String> {
}
