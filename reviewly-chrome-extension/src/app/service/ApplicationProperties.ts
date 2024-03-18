import {LogLevel} from "../utils/Logger";

class ApplicationProperties {

    get apiUrl(): string {
        return process.env.API_URL;
    }

    get reviewWebLinkUrl(): string {
        return process.env.REVIEW_WEB_LINK_URL;
    }

    get tokenApiUrl(): string {
        return process.env.TOKEN_API_URL;
    }

    get clientId(): string {
        return process.env.CLIENT_ID;
    }

    get clientSecret(): string {
        return process.env.CLIENT_SECRET;
    }

    get loginExtensionPage(): string {
        return process.env.LOGIN_EXTENSION_PAGE;
    }

    get logoutExtensionPage(): string {
        return process.env.LOGOUT_EXTENSION_PAGE;
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
