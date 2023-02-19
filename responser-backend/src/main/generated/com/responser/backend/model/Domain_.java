package com.responser.backend.model;

import jakarta.persistence.metamodel.SetAttribute;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import javax.annotation.processing.Generated;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor", date = "2023-02-20T00:49:33.158+0300")
@StaticMetamodel(Domain.class)
public abstract class Domain_ extends com.responser.backend.model.AbstractEntity_ {

	public static volatile SetAttribute<Domain, Page> pages;
	public static volatile SingularAttribute<Domain, Boolean> hasSsl;
	public static volatile SingularAttribute<Domain, String> domain;
	public static volatile SingularAttribute<Domain, String> name;
	public static volatile SingularAttribute<Domain, String> description;

	public static final String PAGES = "pages";
	public static final String HAS_SSL = "hasSsl";
	public static final String DOMAIN = "domain";
	public static final String NAME = "name";
	public static final String DESCRIPTION = "description";

}

