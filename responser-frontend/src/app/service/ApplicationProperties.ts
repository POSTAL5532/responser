import {LogLevel} from "../utils/Logger";

class ApplicationProperties {

    get basePath(): string {
        return "/app";
    }

    get gatewayApiUrl(): string {

        return process.env.API_URL;
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

    get logLevel(): LogLevel {
        return LogLevel[process.env.LOG_LEVEL as keyof typeof LogLevel];
    }
}

export default new ApplicationProperties();
