export class UrlUtils {

    public static getHostFromUrl = (rawUrl: string): string => {
        return new URL(rawUrl).host;
    }

    public static preparePageUrl = (rawUrl: string): string => {
        let formattedUrl = rawUrl.trim();
        formattedUrl = formattedUrl.split("#")[0].replace(/\/$/, "");
        return formattedUrl;
    }
}
