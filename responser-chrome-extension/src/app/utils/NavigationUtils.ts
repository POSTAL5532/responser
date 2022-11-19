import {appRouteHistory} from "router";

export const navigateTo = (url: string) => {
    appRouteHistory.push(url);
}

export const reloadPage = () => {
    window.location.reload();
}
