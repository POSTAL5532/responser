package com.responser.backend.converter;

import com.responser.backend.controller.webresource.payload.WebResourceRequestCriteria;
import com.responser.backend.model.WebResourceCriteria;
import org.springframework.stereotype.Service;

@Service
public class WebResourceCriteriaConverter {

    public WebResourceCriteria toWebResourceCriteria(WebResourceRequestCriteria requestCriteria) {
        return WebResourceCriteria.builder()
            .resourceType(requestCriteria.getResourceType())
            .searchUrl(requestCriteria.getSearchUrl())
            .minRating(requestCriteria.getMinRating())
            .maxRating(requestCriteria.getMaxRating())
            .withReviews(requestCriteria.getWithReviews())
            .sortingField(requestCriteria.getSortingField())
            .sortDirection(requestCriteria.getSortDirection())
            .build();
    }
}
