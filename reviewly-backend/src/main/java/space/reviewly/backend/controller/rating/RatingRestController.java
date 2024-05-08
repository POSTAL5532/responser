package space.reviewly.backend.controller.rating;

import static space.reviewly.backend.config.ApplicationProperties.API_ROOT_PATH;

import lombok.extern.slf4j.Slf4j;
import space.reviewly.backend.controller.RestApiController;
import space.reviewly.backend.controller.rating.payload.ResourceRatings;
import space.reviewly.backend.model.ResourceRating;
import space.reviewly.backend.service.RatingService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(API_ROOT_PATH + "/rating")
public class RatingRestController extends RestApiController {

    private final RatingService ratingService;

    @GetMapping
    public ResponseEntity<ResourceRatings> getResourceRating(@Valid @NotBlank @RequestParam String url) {
        log.debug("Get rating for {}.", url);

        ResourceRating siteResourceRating = ratingService.getSiteFullRatingByUrl(url);
        ResourceRating pageResourceRating = ratingService.getPageFullRatingByUrl(url);

        return ResponseEntity.ok(new ResourceRatings(pageResourceRating, siteResourceRating));
    }
}
