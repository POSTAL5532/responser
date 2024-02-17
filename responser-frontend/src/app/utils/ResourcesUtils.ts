import {User} from "../model/User";
import ApplicationProperties from "../service/ApplicationProperties";
import {WebResource} from "../model/WebResource";

export const getUserAvatarUrl = (user: User): string => {
    if (!user) {
        return null;
    }

    return ApplicationProperties.userAvatarsStorageUrl + "/" + user.avatarFileName;
}

export const getWebResourceIconUrl = (webResource: WebResource): string => {
    const rootWebResource = !webResource.parent ? webResource : webResource.parent;
    return ApplicationProperties.sitesIconsStorageUrl + "/" + rootWebResource.iconFileName;
}
