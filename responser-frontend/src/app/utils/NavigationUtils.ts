import {browserHistory} from "router";
import ApplicationProperties from "../service/ApplicationProperties";

export const navigateTo = (url: string) => {
    browserHistory.push(url);
}

export const nativeNavigateTo = (url: string) => {
    if (url.startsWith("/")) {
        url = ApplicationProperties.basePath + url;
    }

    window.location.href = url;
}

export const nativeNavigateToAuthLogoutPageUrl = () => {
    nativeNavigateTo(ApplicationProperties.authLogoutPageUrl);
}

export const reloadPage = () => {
    window.location.reload();
}
