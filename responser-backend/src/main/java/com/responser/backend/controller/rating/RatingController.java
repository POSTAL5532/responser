package com.responser.backend.controller.rating;

import static com.responser.backend.config.APIServerApplicationProperties.API_ROOT_PATH;

import com.responser.backend.controller.rating.payload.ResourceRatings;
import com.responser.backend.model.ResourceRating;
import com.responser.backend.service.RatingService;
import com.responser.backend.utils.UrlUtils;
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
public class RatingController {

    private final RatingService ratingService;

    @GetMapping
    public ResponseEntity<ResourceRatings> getResourceRating(@Valid @NotBlank @RequestParam String url) {
        String preparedUrl = UrlUtils.prepareUrl(url);

        ResourceRating siteResourceRating = ratingService.getSiteFullRating(preparedUrl);
        ResourceRating pageResourceRating = ratingService.getPageFullRating(preparedUrl);

        return ResponseEntity.ok(new ResourceRatings(pageResourceRating, siteResourceRating));
    }
}
