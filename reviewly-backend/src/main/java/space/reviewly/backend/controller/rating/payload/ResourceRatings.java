package space.reviewly.backend.controller.rating.payload;

import space.reviewly.backend.model.webresource.ResourceRating;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResourceRatings {

    private ResourceRating pageRating;

    private ResourceRating siteRating;
}
