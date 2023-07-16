package com.responser.backend.model.metatags;

import static com.responser.backend.controller.reviews.ReviewsController.REVIEWS_URL;

import com.responser.backend.config.APIServerApplicationProperties;
import com.responser.backend.model.Review;
import com.responser.backend.service.review.ReviewMetaImageGenerator;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FacebookMetaTags extends SocialMetaTags {

    private String url;
    private final String type = "article";
    private final String imageWidth = String.valueOf(ReviewMetaImageGenerator.IMAGE_WIDTH);
    private final String imageHeight = String.valueOf(ReviewMetaImageGenerator.IMAGE_HEIGHT);

    public FacebookMetaTags(Review review, APIServerApplicationProperties applicationProperties) {
        super(review, applicationProperties);
        initUrl();
    }

    private void initUrl() {
        this.url = applicationProperties.getSelfHost() + REVIEWS_URL + "/" + review.getId();
    }
}
