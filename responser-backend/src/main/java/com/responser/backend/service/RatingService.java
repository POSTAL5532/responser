package com.responser.backend.service;

import com.responser.backend.model.ResourceRating;
import com.responser.backend.utils.UrlUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import java.net.URL;
import org.springframework.stereotype.Service;

@Service
public class RatingService {

    @PersistenceContext
    private EntityManager entityManager;

    public ResourceRating getDomainFullRating(String urlValue) {
        URL url = UrlUtils.convertToURL(urlValue);

        TypedQuery<ResourceRating> ratingQuery = entityManager.createQuery(
            "select new com.responser.backend.model.ResourceRating(avg(r.rating), count(*)) from Review r join Domain d on d.domain=:domainName and r.resourceId=d.id",
            ResourceRating.class
        ).setParameter("domainName", url.getHost());

        return ratingQuery.getSingleResult();
    }

    public ResourceRating getPageFullRating(String url) {
        TypedQuery<ResourceRating> ratingQuery = entityManager.createQuery(
            "select new com.responser.backend.model.ResourceRating(avg(r.rating), count(*)) from Review r join Page p on p.url=:url and r.resourceId=p.id",
            ResourceRating.class
        ).setParameter("url", url);

        return ratingQuery.getSingleResult();
    }
}
