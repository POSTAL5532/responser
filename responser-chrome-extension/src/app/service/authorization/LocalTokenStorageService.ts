import {TokenInfo} from "app/model/TokenInfo";
import {ExtensionService} from "../extension/ExtensionService";
import ApplicationProperties from "../ApplicationProperties";

/**
 * Token sore. Contains read/write/delete methods.
 */
class LocalTokenStorageService {

    tokenInfo: TokenInfo = new TokenInfo();

    private extensionService: ExtensionService = new ExtensionService();

    getTokenInfo = () => {
        return this.tokenInfo;
    }

    setTokenInfo = (tokenInfo: TokenInfo) => {
        this.tokenInfo = tokenInfo;
        this.extensionService.setToken(tokenInfo);
    }

    get accessToken(): string {
        return this.tokenInfo?.accessToken;
    }

    get isAccessTokenExist(): boolean {
        return !!this.accessToken;
    }

    get refreshToken(): string {
        return this.tokenInfo?.refreshToken;
    }

    get isRefreshTokenExist(): boolean {
        return !!this.refreshToken;
    }

    /**
     * Removes all info about token from local storage.
     */
    removeAllTokens() {
        this.tokenInfo = null;
        this.extensionService.removeToken();
    }

    get basicAuthorizationHeader(): any {
        return {"Authorization": `Basic ${btoa(ApplicationProperties.clientId + ":" + ApplicationProperties.clientSecret)}`};
    }

    get authorizationHeader(): any {
        return {"Authorization": `Bearer ${this.accessToken}`};
    }
}

export default new LocalTokenStorageService();
