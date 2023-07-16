package com.responser.backend.model;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "review_meta_image")
public class ReviewMetaImage extends AbstractEntity {

    @Column(name = "review_id")
    private String reviewId;

//    @Column(name = "image", columnDefinition="BLOB")
    @Basic(fetch = FetchType.LAZY)
    private byte[] image;
}
