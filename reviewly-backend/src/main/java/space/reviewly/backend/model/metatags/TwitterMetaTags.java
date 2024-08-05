package space.reviewly.backend.model.metatags;

import space.reviewly.backend.config.ApplicationProperties;
import space.reviewly.backend.model.review.Review;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TwitterMetaTags extends SocialMetaTags {
    private final String card = "summary_large_image";
    private final String imageAlt;

    public TwitterMetaTags(Review review, ApplicationProperties applicationProperties) {
        super(review, applicationProperties);
        this.imageAlt = review.getText();
    }
}
