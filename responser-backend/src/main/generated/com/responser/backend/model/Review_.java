package com.responser.backend.model;

import jakarta.persistence.metamodel.SetAttribute;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import javax.annotation.processing.Generated;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor", date = "2023-02-20T00:49:33.140+0300")
@StaticMetamodel(Review.class)
public abstract class Review_ extends com.responser.backend.model.AbstractEntity_ {

	public static volatile SingularAttribute<Review, String> resourceId;
	public static volatile SingularAttribute<Review, Byte> rating;
	public static volatile SingularAttribute<Review, String> text;
	public static volatile SingularAttribute<Review, String> reviewId;
	public static volatile SingularAttribute<Review, User> user;
	public static volatile SingularAttribute<Review, ResourceType> resourceType;
	public static volatile SetAttribute<Review, ReviewLike> likes;

	public static final String RESOURCE_ID = "resourceId";
	public static final String RATING = "rating";
	public static final String TEXT = "text";
	public static final String REVIEW_ID = "reviewId";
	public static final String USER = "user";
	public static final String RESOURCE_TYPE = "resourceType";
	public static final String LIKES = "likes";

}

