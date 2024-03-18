package space.reviewly.backend.service.fileResource;

import java.util.UUID;

public enum FileResourceType {

    USER_AVATAR,
    SITE_ICON;

    public static String generateUserAvatarFileName(String userId, String fileType) {
        return USER_AVATAR.name().toLowerCase() + "_" + userId + "_" + UUID.randomUUID() + '.' + fileType;
    }

    public static String generateSiteIconFileName(String fileType) {
        return SITE_ICON.name().toLowerCase() + "_" + UUID.randomUUID() + '.' + fileType;
    }
}
