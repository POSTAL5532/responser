package com.responser.backend.model;

import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import javax.annotation.processing.Generated;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(ReviewMetaImage.class)
public abstract class ReviewMetaImage_ extends com.responser.backend.model.AbstractEntity_ {

	public static volatile SingularAttribute<ReviewMetaImage, byte[]> image;
	public static volatile SingularAttribute<ReviewMetaImage, String> reviewId;

	public static final String IMAGE = "image";
	public static final String REVIEW_ID = "reviewId";

}

