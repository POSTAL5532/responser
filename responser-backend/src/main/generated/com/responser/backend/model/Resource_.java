package com.responser.backend.model;

import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import javax.annotation.processing.Generated;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor", date = "2022-12-10T01:19:21.383+0300")
@StaticMetamodel(Resource.class)
public abstract class Resource_ extends com.responser.backend.model.AbstractEntity_ {

	public static volatile SingularAttribute<Resource, Domain> domain;
	public static volatile SingularAttribute<Resource, String> name;
	public static volatile SingularAttribute<Resource, String> description;
	public static volatile SingularAttribute<Resource, String> url;

	public static final String DOMAIN = "domain";
	public static final String NAME = "name";
	public static final String DESCRIPTION = "description";
	public static final String URL = "url";

}

