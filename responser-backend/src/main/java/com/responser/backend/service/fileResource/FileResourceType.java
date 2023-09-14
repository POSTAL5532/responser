package com.responser.backend.service.fileResource;

public enum FileResourceType {

    USER_AVTAR("user_avatar"),
    REVIEW_META_IMAGE("review_meta_image");

    private final String value;

    FileResourceType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
