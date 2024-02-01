export class UrlUtils {

    public static getHostFromUrl = (rawUrl: string): string => {
        return new URL(rawUrl).host;
    }
}