package com.responser.backend.model;

import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(AbstractEntity.class)
public abstract class AbstractEntity_ {

	public static volatile SingularAttribute<AbstractEntity, LocalDateTime> updateDate;
	public static volatile SingularAttribute<AbstractEntity, String> id;
	public static volatile SingularAttribute<AbstractEntity, LocalDateTime> creationDate;

	public static final String UPDATE_DATE = "updateDate";
	public static final String ID = "id";
	public static final String CREATION_DATE = "creationDate";

}

