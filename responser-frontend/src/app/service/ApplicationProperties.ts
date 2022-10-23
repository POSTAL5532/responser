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
}

export default new ApplicationProperties();
