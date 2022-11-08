class ApplicationProperties {

    get gatewayApiUrl(): string {
        return process.env.API_URL;
    }

    get authServerUrl(): string {
        return process.env.AUTH_API_URL;
    }

    get clientId(): string {
        return process.env.CLIENT_ID;
    }

    get clientSecret(): string {
        return process.env.CLIENT_SECRET;
    }

    get chromeExtensionId(): string {
        return process.env.CHROME_EXTENSION_ID;
    }
}

export default new ApplicationProperties();
