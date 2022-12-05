package com.responser.backend.repository;

import com.responser.backend.model.ResponseLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * ReviewLikeRepository
 *
 * @author SIE
 */
@Repository
public interface ReviewLikeRepository extends JpaRepository<ResponseLike, String> {
}
