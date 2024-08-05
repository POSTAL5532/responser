import {User} from "../model/User";
import ApplicationProperties from "../service/ApplicationProperties";

export const getUserAvatarUrl = (user: User): string => {
    if (!user) {
        return null;
    }

    if (!user.avatarFileName) {
        return ApplicationProperties.userAvatarsStorageUrl + "/" + ApplicationProperties.defaultUserAvatarFileName;
    }

    if (user.avatarFileName.startsWith("http://") || user.avatarFileName.startsWith("https://")) {
        return user.avatarFileName;
    }

    return ApplicationProperties.userAvatarsStorageUrl + "/" + user.avatarFileName;
}
