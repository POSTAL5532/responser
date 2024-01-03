package com.responser.backend.model;

public enum WebResourceCriteriaSortingField {

    CREATION_DATE(WebResource_.CREATION_DATE),
    RATING("rating");

    private final String fieldName;

    WebResourceCriteriaSortingField(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getFieldName() {
        return fieldName;
    }
}
