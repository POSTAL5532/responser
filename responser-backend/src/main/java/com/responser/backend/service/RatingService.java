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

    public ResourceRating getSiteFullRating(String rawUrl) {
        String url = UrlUtils.prepareSiteUrl(rawUrl);

        TypedQuery<ResourceRating> ratingQuery = entityManager.createQuery(
            "select new com.responser.backend.model.ResourceRating(avg(r.rating), count(*)) from Review r join WebResource wr on wr.url=:url and r.resourceId=wr.id and wr.resourceType='SITE'",
            ResourceRating.class
        ).setParameter("url", url);

        return ratingQuery.getSingleResult();
    }

    public ResourceRating getPageFullRating(String rawUrl) {
        String url = UrlUtils.preparePageUrl(rawUrl);

        TypedQuery<ResourceRating> ratingQuery = entityManager.createQuery(
            "select new com.responser.backend.model.ResourceRating(avg(r.rating), count(*)) from Review r join WebResource wr on wr.url=:url and r.resourceId=wr.id and wr.resourceType='PAGE'",
            ResourceRating.class
        ).setParameter("url", url);

        return ratingQuery.getSingleResult();
    }
}
