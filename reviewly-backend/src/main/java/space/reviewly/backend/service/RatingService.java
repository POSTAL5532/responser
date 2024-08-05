package space.reviewly.backend.service;

import space.reviewly.backend.model.webresource.ResourceRating;
import space.reviewly.backend.model.webresource.ResourceType;
import space.reviewly.backend.utils.UrlUtils;
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

    public ResourceRating getResourceFullRatingById(String resourceId) {
        TypedQuery<ResourceRating> ratingQuery = entityManager.createQuery(
            "select new space.reviewly.backend.model.webresource.ResourceRating(r.resourceId, avg(r.rating), count(*)) from Review r where r.resourceId=:resourceId group by r.resourceId",
            ResourceRating.class
        ).setParameter("resourceId", resourceId);

        try {
            return ratingQuery.getSingleResult();
        } catch (NoResultException exception) {
            return null;
        }
    }

    public ResourceRating getSiteFullRatingByUrl(String rawUrl) {
        String url = UrlUtils.prepareSiteUrl(rawUrl);
        return getFullRatingByUrl(url, ResourceType.SITE);
    }

    public ResourceRating getPageFullRatingByUrl(String rawUrl) {
        String url = UrlUtils.preparePageUrl(rawUrl);
        return getFullRatingByUrl(url, ResourceType.PAGE);
    }

    public ResourceRating getFullRatingByUrl(String url, ResourceType resourceType) {
        TypedQuery<ResourceRating> ratingQuery = entityManager.createQuery(
                "select new space.reviewly.backend.model.webresource.ResourceRating(wr.id, avg(r.rating), count(*)) from Review r join WebResource wr on wr.url=:url and r.resourceId=wr.id and wr.resourceType=:resourceType group by wr.id",
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
            "select new space.reviewly.backend.model.webresource.ResourceRating(r.resourceId, avg(r.rating), count(*)) from Review r where r.resourceId in :resourcesIdList group by r.resourceId",
            ResourceRating.class
        ).setParameter("resourcesIdList", resourcesIdList);

        return ratingQuery.getResultList();
    }

    public Double getUserReviewsRating(String userId) {
        TypedQuery<Double> reviewsRatingQuery = entityManager.createQuery(
            "select avg(r.rating) from Review r where r.userId = :userId",
            Double.class
        ).setParameter("userId", userId);

        return reviewsRatingQuery.getSingleResult();
    }
}
