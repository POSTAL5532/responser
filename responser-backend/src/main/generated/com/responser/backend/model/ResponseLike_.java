package com.responser.backend.model;

import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import javax.annotation.processing.Generated;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor", date = "2022-12-10T01:19:21.390+0300")
@StaticMetamodel(ResponseLike.class)
public abstract class ResponseLike_ extends com.responser.backend.model.AbstractEntity_ {

	public static volatile SingularAttribute<ResponseLike, Boolean> positive;
	public static volatile SingularAttribute<ResponseLike, String> userId;
	public static volatile SingularAttribute<ResponseLike, String> reviewId;

	public static final String POSITIVE = "positive";
	public static final String USER_ID = "userId";
	public static final String REVIEW_ID = "reviewId";

}

