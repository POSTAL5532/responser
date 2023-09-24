package com.responser.backend.model;

public enum ReviewsCriteriaSortingField {

    RESOURCE_ID(Review_.RESOURCE_ID),
    REVIEW_ID(Review_.REVIEW_ID),
    CREATION_DATE(Review_.CREATION_DATE),
    RATING(Review_.RATING),
    POPULARITY("popularity");

    private final String fieldName;

    ReviewsCriteriaSortingField(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getFieldName() {
        return fieldName;
    }
}
