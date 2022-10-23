package com.responser.backend.repository;

import com.responser.backend.model.ResponseLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * ResponseLike
 *
 * @author SIE
 */
@Repository
public interface ResponseLikeRepository extends JpaRepository<ResponseLike, String> {
}
