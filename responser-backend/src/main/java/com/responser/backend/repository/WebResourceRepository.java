package com.responser.backend.repository;

import com.responser.backend.model.ResourceType;
import com.responser.backend.model.WebResource;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WebResourceRepository extends JpaRepository<WebResource, String> {

    Optional<WebResource> findByUrlAndResourceType(String url, ResourceType resourceType);

    @Query("select avg(r.rating) from Review r where r.resourceId=:id")
    Float getRatingById(String id);

    @Query("select avg(r.rating) from Review r join WebResource wr on r.resourceId=wr.id and wr.url=:url and wr.resourceType=:resourceType")
    Float getRatingByUrlAndResourceType(String url, ResourceType resourceType);

    @Query("select count(*) from Review r where r.resourceId=:resourceId")
    Integer getReviewsCount(String resourceId);

    Boolean existsByUrlAndResourceType(String url, ResourceType resourceType);
}
