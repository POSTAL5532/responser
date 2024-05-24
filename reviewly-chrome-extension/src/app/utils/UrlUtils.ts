import {WebResource} from "../model/WebResource";

export class UrlUtils {

    public static getHostFromUrl = (rawUrl: string): string => {
        return new URL(rawUrl).host;
    }

    public static getHostFromWebResource = (webResource: WebResource): string => {
        if (!webResource) return null;

        const rootWebResource = !webResource.parent ? webResource : webResource.parent;
        return UrlUtils.getHostFromUrl(rootWebResource.url);
    }

    public static preparePageUrl = (rawUrl: string): string => {
        let formattedUrl = rawUrl.trim();
        formattedUrl = formattedUrl.split("#")[0].replace(/\/$/, "");
        return formattedUrl;
    }

    public static replaceLinks = (text: string): string => {
        const urlPattern = /(http[s]?:\/\/)?(www\.)?\S+\.\S+/gi;
        return text.replace(urlPattern, "***");
    }
}
