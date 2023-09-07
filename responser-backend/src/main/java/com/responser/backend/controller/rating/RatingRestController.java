package com.responser.backend.controller.rating;

import static com.responser.backend.config.ApplicationProperties.API_ROOT_PATH;

import com.responser.backend.controller.RestApiController;
import com.responser.backend.controller.rating.payload.ResourceRatings;
import com.responser.backend.model.ResourceRating;
import com.responser.backend.service.RatingService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping(API_ROOT_PATH + "/rating")
public class RatingRestController extends RestApiController {

    private final RatingService ratingService;

    @GetMapping
    public ResponseEntity<ResourceRatings> getResourceRating(@Valid @NotBlank @RequestParam String url) {
        ResourceRating siteResourceRating = ratingService.getSiteFullRatingByUrl(url);
        ResourceRating pageResourceRating = ratingService.getPageFullRatingByUrl(url);

        return ResponseEntity.ok(new ResourceRatings(pageResourceRating, siteResourceRating));
    }
}
