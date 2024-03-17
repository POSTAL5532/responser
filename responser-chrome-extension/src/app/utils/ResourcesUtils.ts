import {User} from "../model/User";
import ApplicationProperties from "../service/ApplicationProperties";
import {WebResource} from "../model/WebResource";

export const getUserAvatarUrl = (user: User): string => {
    if (!user) {
        return null;
    }

    if (!user.avatarFileName) {
        return ApplicationProperties.userAvatarsStorageUrl + "/" + ApplicationProperties.defaultUserAvatarFileName;
    }

    return ApplicationProperties.userAvatarsStorageUrl + "/" + user.avatarFileName;
}

export const getWebResourceIconUrl = (webResource: WebResource): string => {
    if (!webResource) {
        return null;
    }

    const rootWebResource = !webResource.parent ? webResource : webResource.parent;

    if (!rootWebResource.iconFileName) {
        return ApplicationProperties.sitesIconsStorageUrl + "/" + ApplicationProperties.defaultSiteIconFileName;
    }

    return ApplicationProperties.sitesIconsStorageUrl + "/" + rootWebResource.iconFileName;
}
