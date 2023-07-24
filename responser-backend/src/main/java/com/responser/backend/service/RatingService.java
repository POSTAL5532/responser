package com.responser.backend.service;

import com.responser.backend.model.ResourceRating;
import com.responser.backend.model.ResourceType;
import com.responser.backend.utils.UrlUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class RatingService {

    @PersistenceContext
    private EntityManager entityManager;

    public ResourceRating getSiteFullRating(String rawUrl) {
        String url = UrlUtils.prepareSiteUrl(rawUrl);
        return getFullRating(url, ResourceType.SITE);
    }

    public ResourceRating getPageFullRating(String rawUrl) {
        String url = UrlUtils.preparePageUrl(rawUrl);
        return getFullRating(url, ResourceType.PAGE);
    }

    public ResourceRating getFullRating(String url, ResourceType resourceType) {
        TypedQuery<ResourceRating> ratingQuery = entityManager.createQuery(
            "select new com.responser.backend.model.ResourceRating(wr.id, avg(r.rating), count(*)) from Review r join WebResource wr on wr.url=:url and r.resourceId=wr.id and wr.resourceType=:resourceType group by wr.id",
            ResourceRating.class
        ).setParameter("url", url)
            .setParameter("resourceType", resourceType);

        try {
            return ratingQuery.getSingleResult();
        } catch (NoResultException exception) {
            return null;
        }
    }

    public List<ResourceRating> getWebResourcesRatings(List<String> resourcesIdList) {
        TypedQuery<ResourceRating> ratingQuery = entityManager.createQuery(
            "select new com.responser.backend.model.ResourceRating(r.resourceId, avg(r.rating), count(*)) from Review r where r.resourceId in :resourcesIdList group by r.resourceId",
            ResourceRating.class
        ).setParameter("resourcesIdList", resourcesIdList);

        return ratingQuery.getResultList();
    }
}
