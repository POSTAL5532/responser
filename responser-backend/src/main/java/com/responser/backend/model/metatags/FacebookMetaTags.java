package com.responser.backend.model.metatags;

import static com.responser.backend.controller.reviews.ReviewsController.REVIEWS_URL;

import com.responser.backend.config.APIServerApplicationProperties;
import com.responser.backend.model.ResourceType;
import com.responser.backend.model.Review;
import com.responser.backend.utils.UrlUtils;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FacebookMetaTags {

    private final Review review;
    private final APIServerApplicationProperties applicationProperties;

    private String url;
    private String type = "article";
    private String title;
    private String description;
    private String imageUrl = "none";

    public FacebookMetaTags(Review review, APIServerApplicationProperties applicationProperties) {
        this.review = review;
        this.applicationProperties = applicationProperties;

        initUrl();
        initTitle();
        initDescription();
    }

    private void initUrl() {
        this.url = applicationProperties.getSelfHost() + REVIEWS_URL + "/" + review.getId();
    }

    private void initTitle() {
        StringBuilder titleBuilder = new StringBuilder();

        if (review.getRating() >= 4) {
            titleBuilder.append("Wow! It's ");
        } else if (review.getRating() < 2) {
            titleBuilder.append("Oh. Just ");
        }

        titleBuilder.append(review.getRating());
        titleBuilder.append(" rating stars for ");
        titleBuilder.append(review.getWebResource().getResourceType() == ResourceType.PAGE ? "page" : "site");
        titleBuilder.append(" of ");
        titleBuilder.append(UrlUtils.getHost(review.getWebResource().getUrl()));

        this.title = titleBuilder.toString();
    }

    private void initDescription() {
        this.description = review.getText();
    }
}
