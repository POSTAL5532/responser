package com.responser.backend.model;

import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import javax.annotation.processing.Generated;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(ReviewLike.class)
public abstract class ReviewLike_ extends com.responser.backend.model.AbstractEntity_ {

	public static volatile SingularAttribute<ReviewLike, Review> review;
	public static volatile SingularAttribute<ReviewLike, Boolean> positive;
	public static volatile SingularAttribute<ReviewLike, String> userId;

	public static final String REVIEW = "review";
	public static final String POSITIVE = "positive";
	public static final String USER_ID = "userId";

}

