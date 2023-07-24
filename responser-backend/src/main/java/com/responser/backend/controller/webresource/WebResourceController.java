package com.responser.backend.controller.webresource;

import com.responser.backend.controller.webresource.payload.WebResourceDTO;
import com.responser.backend.converter.WebResourceConverter;
import com.responser.backend.model.AbstractEntity;
import com.responser.backend.model.ResourceRating;
import com.responser.backend.model.WebResource;
import com.responser.backend.service.RatingService;
import com.responser.backend.service.WebResourceService;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequiredArgsConstructor
@Controller
@RequestMapping("/web-resources")
public class WebResourceController {

    private final WebResourceConverter webResourceConverter;
    private final WebResourceService webResourceService;
    private final RatingService ratingService;

    @GetMapping("/sites-rating")
    public String getSitesRating(Model model, @RequestParam(required = false, defaultValue = "0") Integer page) {
        Page<WebResource> webResourcesPage = webResourceService.getSitesWithReviews(PageRequest.of(page, 10));
        List<String> ids = webResourcesPage.getContent().stream().map(AbstractEntity::getId).toList();

        Map<String, ResourceRating> ratings = ratingService.getWebResourcesRatings(ids).stream()
            .collect(Collectors.toMap(ResourceRating::getResourceId, Function.identity()));

        List<WebResourceDTO> webResourceDTOS = webResourcesPage.getContent().stream().map(webResource -> {
            WebResourceDTO dto = webResourceConverter.toDTO(webResource);
            ResourceRating rating = ratings.get(webResource.getId());

            dto.setRating(rating.getRating());
            dto.setReviewsCount(rating.getReviewsCount());

            return dto;
        }).toList();

        model.addAttribute("sites", webResourceDTOS);
        model.addAttribute("isLast", webResourcesPage.isLast());
        model.addAttribute("totalPages", webResourcesPage.getTotalPages());
        model.addAttribute("currentPageNumber", webResourcesPage.getNumber());
        model.addAttribute("currentPageNumberOfElements", webResourcesPage.getNumberOfElements());

        return "sitesRating";
    }
}
