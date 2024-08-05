package space.reviewly.backend.model.webresource;

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
