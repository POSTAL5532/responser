package space.reviewly.backend.model.metatags;

import static space.reviewly.backend.controller.reviews.ReviewsController.REVIEWS_URL;

import space.reviewly.backend.config.ApplicationProperties;
import space.reviewly.backend.model.review.Review;
import space.reviewly.backend.service.review.ReviewMetaImageGenerator;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FacebookMetaTags extends SocialMetaTags {

    private String url;
    private final String type = "article";
    private final String imageWidth = String.valueOf(ReviewMetaImageGenerator.IMAGE_WIDTH);
    private final String imageHeight = String.valueOf(ReviewMetaImageGenerator.IMAGE_HEIGHT);

    public FacebookMetaTags(Review review, ApplicationProperties applicationProperties) {
        super(review, applicationProperties);
        initUrl();
    }

    private void initUrl() {
        this.url = applicationProperties.getSelfHost() + REVIEWS_URL + "/" + review.getId();
    }
}
