package space.reviewly.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResourceRating {

    private String resourceId;

    private Double rating;

    private Long reviewsCount;

    public ResourceRating(String resourceId, Double rating, Long reviewsCount) {
        this.resourceId = resourceId;
        this.rating = rating;
        this.reviewsCount = reviewsCount;
    }
}
