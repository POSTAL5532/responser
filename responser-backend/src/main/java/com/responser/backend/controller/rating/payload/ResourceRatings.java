package com.responser.backend.controller.rating.payload;

import com.responser.backend.model.ResourceRating;
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
