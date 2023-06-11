package com.responser.backend.repository;

import com.responser.backend.model.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Pages repository
 *
 * @author Shcherbachenya Igor
 */
@Repository
public interface PagesRepository extends JpaRepository<Page, String> {

    Optional<Page> findByUrl(String url);

    @Query("select avg(r.rating) from Review r where r.resourceId=:pageId and r.resourceType='PAGE'")
    Double commonRating(String pageId);

    @Query("select count(*) from Review r where r.resourceId=:pageId and r.resourceType='PAGE'")
    Integer reviewsCount(String pageId);
}
