package com.responser.backend.model;

import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import javax.annotation.processing.Generated;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor", date = "2022-12-10T15:05:48.095+0300")
@StaticMetamodel(Review.class)
public abstract class Review_ extends com.responser.backend.model.AbstractEntity_ {

	public static volatile SingularAttribute<Review, String> resourceId;
	public static volatile SingularAttribute<Review, Byte> rating;
	public static volatile SingularAttribute<Review, String> text;
	public static volatile SingularAttribute<Review, User> user;
	public static volatile SingularAttribute<Review, String> reviewId;

	public static final String RESOURCE_ID = "resourceId";
	public static final String RATING = "rating";
	public static final String TEXT = "text";
	public static final String USER = "user";
	public static final String REVIEW_ID = "reviewId";

}

