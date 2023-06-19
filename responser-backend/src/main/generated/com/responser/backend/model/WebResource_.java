package com.responser.backend.model;

import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import javax.annotation.processing.Generated;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(WebResource.class)
public abstract class WebResource_ extends com.responser.backend.model.AbstractEntity_ {

	public static volatile SingularAttribute<WebResource, WebResource> parent;
	public static volatile SingularAttribute<WebResource, String> url;
	public static volatile SingularAttribute<WebResource, ResourceType> resourceType;

	public static final String PARENT = "parent";
	public static final String URL = "url";
	public static final String RESOURCE_TYPE = "resourceType";

}

