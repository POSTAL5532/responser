import {browserHistory} from "router";

export const navigateTo = (url: string) => {
    browserHistory.push(url);
}

export const nativeNavigateTo = (url: string) => {
    window.location.href = url;
}

export const reloadPage = () => {
    window.location.reload();
}
