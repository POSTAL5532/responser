import {browserHistory} from "router";

export const navigateTo = (url: string, native: boolean = false) => {
    if (native) {
        window.location.href = url;
    } else {
        browserHistory.push(url);
    }
}

export const reloadPage = () => {
    window.location.reload();
}
