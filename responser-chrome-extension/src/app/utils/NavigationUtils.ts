import {appRouteHistory} from "router";

export const navigateTo = <T = any>(url: string, parameters?: T) => {
    appRouteHistory.push(url, parameters);
}

export const reloadPage = () => {
    window.location.reload();
}
