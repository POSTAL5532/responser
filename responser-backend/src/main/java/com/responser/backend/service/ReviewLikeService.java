package com.responser.backend.service;

import com.responser.backend.model.ReviewLike;
import com.responser.backend.repository.ReviewLikeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * ReviewLikeService
 *
 * @author SIE
 */
@AllArgsConstructor
@Service
@Transactional(readOnly = true)
public class ReviewLikeService {

    private final ReviewLikeRepository reviewLikeRepository;

    @Transactional
    public ReviewLike createLike(ReviewLike newLike) {
        return reviewLikeRepository.save(newLike);
    }

    @Transactional
    public void removeLike(ReviewLike like) {
        reviewLikeRepository.delete(like);
    }
}
