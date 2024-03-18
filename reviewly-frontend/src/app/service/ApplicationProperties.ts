import {LogLevel} from "../utils/Logger";

class ApplicationProperties {

    get basePath(): string {
        return "/app";
    }

    get apiUrl(): string {
        return process.env.API_URL;
    }

    get landingPageUrl(): string {
        return process.env.LANDING_URL;
    }

    get reviewWebLinkUrl(): string {
        return process.env.REVIEW_WEB_LINK_URL;
    }

    get authLoginPageUrl(): string {
        return process.env.AUTH_LOGIN_PAGE_URL;
    }

    get authLogoutPageUrl(): string {
        return process.env.AUTH_LOGOUT_PAGE_URL;
    }

    get authTokenUrl(): string {
        return process.env.AUTH_TOKEN_URL;
    }

    get authRedirectUri(): string {
        return process.env.AUTH_REDIRECT_URI;
    }

    get unauthorizedPageUrl(): string {
        return process.env.UNAUTHORIZED_PAGE_URL;
    }

    get clientId(): string {
        return process.env.CLIENT_ID;
    }

    get clientSecret(): string {
        return process.env.CLIENT_SECRET;
    }

    get downloadExtensionChrome(): string {
        return process.env.DOWNLOAD_EXTENSION_CHROME;
    }

    get chromeExtensionId(): string {
        return process.env.CHROME_EXTENSION_ID;
    }

    get userAvatarsStorageUrl(): string {
        return process.env.USER_AVATARS_URL;
    }

    get sitesIconsStorageUrl(): string {
        return process.env.SITES_ICONS_URL;
    }

    get defaultUserAvatarFileName(): string {
        return process.env.DEFAULT_USER_AVATAR_FILE_NAME;
    }

    get defaultSiteIconFileName(): string {
        return process.env.DEFAULT_SITE_ICON_FILE_NAME;
    }

    get logLevel(): LogLevel {
        return LogLevel[process.env.LOG_LEVEL as keyof typeof LogLevel];
    }
}

export default new ApplicationProperties();
