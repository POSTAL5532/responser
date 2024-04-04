import {User} from "../model/User";
import ApplicationProperties from "../service/ApplicationProperties";
import {WebResource} from "../model/WebResource";
import {Logger} from "./Logger";
import defaultSiteIconTemplate from "../../images/default_site_icon_template.png";

const logger: Logger = new Logger("ResourcesUtils");

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

export const compareSiteIconBlobWithGoogleTemplate = async (blob: Blob): Promise<boolean> => {
    logger.debug("Compare site icons blobs - start");

    const response = await fetch(defaultSiteIconTemplate);
    const templateBlob = await response.blob();

    const templateString = await new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onabort = fileReader.onerror = reject;
        fileReader.onload = (event) => {
            resolve(event.target.result as string);
        }

        fileReader.readAsDataURL(templateBlob);
    });

    const originalString = await new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onabort = fileReader.onerror = reject;
        fileReader.onload = (event) => {
            resolve(event.target.result as string);
        }

        fileReader.readAsDataURL(blob);
    });

    logger.debug("Compare site icons - template blob string:", templateString);
    logger.debug("Compare site icons - original blob string:", originalString);
    logger.debug("Compare site icons - result:", templateString === originalString);

    return templateString === originalString;
}
