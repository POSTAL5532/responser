package com.responser.backend.repository;

import com.responser.backend.model.ResourceType;
import com.responser.backend.model.WebResource;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WebResourceRepository extends JpaRepository<WebResource, String> {

    @Query("select w from WebResource w inner join Review r on w.id = r.resourceId where w.resourceType=:resourceType group by w.id")
    Page<WebResource> findWithReviewsByResourceType(ResourceType resourceType, Pageable pageable);

    Optional<WebResource> findByUrlAndResourceType(String url, ResourceType resourceType);

    Boolean existsByUrlAndResourceType(String url, ResourceType resourceType);
}
