package com.responser.backend.repository;

import com.responser.backend.model.ResourceType;
import com.responser.backend.model.WebResource;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WebResourceRepository extends JpaRepository<WebResource, String> {

    @Query("""
        select w from WebResource w
        left join fetch w.parent parent
        inner join Review r on w.id = r.resourceId
        where w.resourceType=:resourceType
        group by w.id, parent.id
        """)
    Page<WebResource> findWithReviewsByResourceType(ResourceType resourceType, Pageable pageable);

    @Query("""
        select w from WebResource w
        left join fetch w.parent parent
        inner join Review r on w.id = r.resourceId
        where w.resourceType=:resourceType and w.url like %:searchUrl%
        group by w.id, parent.id
        """)
    Page<WebResource> findWithReviewsByResourceTypeAndUrlContainingSearchUrl(
        ResourceType resourceType,
        @Param("searchUrl") String searchUrl,
        Pageable pageable
    );

    @Query("""
        select w from WebResource w
        left join fetch w.parent parent
        where w.url=:url and w.resourceType=:resourceType
        group by w.id, parent.id
        """)
    Optional<WebResource> findByUrlAndResourceType(String url, ResourceType resourceType);

    Boolean existsByUrlAndResourceType(String url, ResourceType resourceType);
}
