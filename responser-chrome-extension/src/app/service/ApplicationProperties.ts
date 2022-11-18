class ApplicationProperties {

    get gatewayApiUrl(): string {
        return process.env.API_URL;
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
}

export default new ApplicationProperties();
