package com.responser.backend.model;

import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import javax.annotation.processing.Generated;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Page.class)
public abstract class Page_ extends com.responser.backend.model.AbstractEntity_ {

	public static volatile SingularAttribute<Page, Domain> domain;
	public static volatile SingularAttribute<Page, String> url;

	public static final String DOMAIN = "domain";
	public static final String URL = "url";

}

