package com.responser.backend.service.review;

import static java.text.MessageFormat.format;

import com.responser.backend.model.Review;
import com.responser.backend.model.ReviewMetaImage;
import com.responser.backend.repository.ReviewMetaImageRepository;
import java.io.ByteArrayOutputStream;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ReviewMetaImageService {

    private final ReviewMetaImageRepository metaImageRepository;

    private final ReviewMetaImageGenerator metaImageGenerator;

    public ReviewMetaImage getByReviewId(String reviewId) {
        return metaImageRepository.findByReviewId(reviewId).orElseThrow(() -> {
            log.error("Review meta image with review id {} doesn't exist", reviewId);
            return new NoSuchElementException(format("Review meta image with review id ''{0}'' doesn't exist", reviewId));
        });
    }

    @Transactional
    public ReviewMetaImage create(Review review) {
        ByteArrayOutputStream imageStream = metaImageGenerator.generate(review);

        ReviewMetaImage metaImage = new ReviewMetaImage();
        metaImage.setReviewId(review.getId());
        metaImage.setImage(imageStream.toByteArray());

        metaImageRepository.save(metaImage);

        return metaImage;
    }

    @Transactional
    public ReviewMetaImage update(Review review) {
        ByteArrayOutputStream imageStream = metaImageGenerator.generate(review);
        ReviewMetaImage reviewMetaImage = getByReviewId(review.getId());
        reviewMetaImage.setImage(imageStream.toByteArray());
        metaImageRepository.save(reviewMetaImage);

        return reviewMetaImage;
    }
}
