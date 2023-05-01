package com.responser.backend.model;

import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import javax.annotation.processing.Generated;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(User.class)
public abstract class User_ extends com.responser.backend.model.AbstractEntity_ {

	public static volatile SingularAttribute<User, String> password;
	public static volatile SingularAttribute<User, Boolean> emailConfirmed;
	public static volatile SingularAttribute<User, String> fullName;
	public static volatile SingularAttribute<User, String> userName;
	public static volatile SingularAttribute<User, String> email;

	public static final String PASSWORD = "password";
	public static final String EMAIL_CONFIRMED = "emailConfirmed";
	public static final String FULL_NAME = "fullName";
	public static final String USER_NAME = "userName";
	public static final String EMAIL = "email";

}

