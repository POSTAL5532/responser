import {appRouteHistory} from "router";

export const navigateTo = <T = any>(url: string, parameters?: T) => {
    appRouteHistory.push(url, parameters);
}

export const nativeNavigateTo = (url: string) => {
    console.log(window.location.href)
    console.log(window.location.hostname)
    console.log(window.location.pathname)

    if (!url.startsWith("/")) {
        throw new Error("Bad navigation URL path: " + url)
    }

    window.location.href = url;
}

export const reloadPage = () => {
    window.location.reload();
}
