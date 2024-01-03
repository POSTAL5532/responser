package com.responser.backend.repository;

import com.responser.backend.model.ResourceType;
import com.responser.backend.model.WebResource;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WebResourceRepository extends JpaRepository<WebResource, String>, JpaSpecificationExecutor<WebResource> {

    @Query("""
        select w from WebResource w
        left join fetch w.parent parent
        where w.url=:url and w.resourceType=:resourceType
        group by w.id, parent.id
        """)
    Optional<WebResource> findByUrlAndResourceType(String url, ResourceType resourceType);

    Boolean existsByUrlAndResourceType(String url, ResourceType resourceType);
}
