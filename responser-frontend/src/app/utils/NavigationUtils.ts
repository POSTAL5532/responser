import {browserHistory} from "router";
import applicationProperties from "../service/ApplicationProperties";

export const navigateTo = (url: string) => {
    browserHistory.push(url);
}

export const nativeNavigateTo = (url: string) => {
    window.location.href = url;
}

export const nativeNavigateToUnauthorizedPage = () => {
    nativeNavigateTo(applicationProperties.unauthorizedPageUrl);
}

export const reloadPage = () => {
    window.location.reload();
}
