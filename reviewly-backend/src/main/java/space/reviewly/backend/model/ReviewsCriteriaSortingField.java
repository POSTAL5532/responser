package space.reviewly.backend.model;

public enum ReviewsCriteriaSortingField {

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
