package space.reviewly.backend.model.metatags;

import static space.reviewly.backend.controller.reviews.ReviewsController.REVIEWS_URL;
import static space.reviewly.backend.controller.reviews.ReviewsController.REVIEW_META_IMAGE_URL;

import space.reviewly.backend.config.ApplicationProperties;
import space.reviewly.backend.model.webresource.ResourceType;
import space.reviewly.backend.model.review.Review;
import space.reviewly.backend.utils.UrlUtils;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Objects;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class SocialMetaTags {

    public static final String ID_TIMESTAMP_SEPARATOR = "_";

    protected final Review review;
    protected final ApplicationProperties applicationProperties;

    protected final String description = "Find reviews faster and make choices easier with Reviewly. Reviewly Integrated into the browser and allows you to read reviews and leave your opinion about any site without leaving it";
    protected String title;
    protected String imageUrl;

    public SocialMetaTags(Review review, ApplicationProperties applicationProperties) {
        this.review = review;
        this.applicationProperties = applicationProperties;

        initTitle();
        initImageUrl();
    }

    protected void initImageUrl() {
        String baseUrl = applicationProperties.getSelfHost() + REVIEWS_URL + REVIEW_META_IMAGE_URL +"/" + review.getId();

        this.imageUrl = baseUrl + ID_TIMESTAMP_SEPARATOR + (
            !Objects.isNull(review.getUpdateDate()) ? getEpochSecond(review.getUpdateDate()) : getEpochSecond(review.getCreationDate())
        );
    }

    protected void initTitle() {
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

    private long getEpochSecond(LocalDateTime dateTime) {
        return dateTime.atZone(ZoneId.systemDefault()).toEpochSecond();
    }
}
