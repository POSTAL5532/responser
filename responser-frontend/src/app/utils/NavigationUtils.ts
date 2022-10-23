import {browserHistory} from "router";

export const navigateTo = (path: string) => {
    if (!path || !path.startsWith("/")) {
        throw Error(`Bad navigate path: ${path}`);
    }

    browserHistory.push(path);
}
