package com.responser.backend.model;

import jakarta.persistence.metamodel.SetAttribute;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import javax.annotation.processing.Generated;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor", date = "2022-12-12T14:40:43.318+0300")
@StaticMetamodel(Domain.class)
public abstract class Domain_ extends com.responser.backend.model.AbstractEntity_ {

	public static volatile SingularAttribute<Domain, Boolean> hasSsl;
	public static volatile SingularAttribute<Domain, String> domain;
	public static volatile SingularAttribute<Domain, String> name;
	public static volatile SingularAttribute<Domain, String> description;
	public static volatile SetAttribute<Domain, Resource> resources;

	public static final String HAS_SSL = "hasSsl";
	public static final String DOMAIN = "domain";
	public static final String NAME = "name";
	public static final String DESCRIPTION = "description";
	public static final String RESOURCES = "resources";

}

