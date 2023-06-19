package com.responser.backend.service;

import com.responser.backend.model.ResourceRating;
import com.responser.backend.utils.UrlUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Service;

@Service
public class RatingService {

    @PersistenceContext
    private EntityManager entityManager;

    public ResourceRating getSiteFullRating(String urlValue) {
        String url = UrlUtils.prepareSiteUrl(urlValue);

        TypedQuery<ResourceRating> ratingQuery = entityManager.createQuery(
            "select new com.responser.backend.model.ResourceRating(avg(r.rating), count(*)) from Review r join WebResource wr on wr.url=:url and r.resourceId=wr.id",
            ResourceRating.class
        ).setParameter("url", url);

        return ratingQuery.getSingleResult();
    }

    public ResourceRating getPageFullRating(String url) {
        TypedQuery<ResourceRating> ratingQuery = entityManager.createQuery(
            "select new com.responser.backend.model.ResourceRating(avg(r.rating), count(*)) from Review r join WebResource wr on wr.url=:url and r.resourceId=wr.id",
            ResourceRating.class
        ).setParameter("url", url);

        return ratingQuery.getSingleResult();
    }
}
