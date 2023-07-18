package com.responser.backend.model.metatags;

import com.responser.backend.config.ApplicationProperties;
import com.responser.backend.model.Review;
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
