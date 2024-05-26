import {ExtensionService} from "../extension/ExtensionService";
import ApplicationProperties from "../ApplicationProperties";
import {Logger} from "../../utils/Logger";
import {TokenInfo} from "../../model/TokenInfo";

/**
 * Token store. Contains read/write/delete methods.
 */
class LocalTokenStorageService {

    logger: Logger = new Logger("LocalTokenStorageService");

    tokenInfo: TokenInfo = new TokenInfo();

    private extensionService: ExtensionService = new ExtensionService();

    setTokenInfo = (tokenInfo: TokenInfo, setBackgroundToken: boolean = false) => {
        this.logger.debug("Set tokens.");
        this.tokenInfo = tokenInfo;
        if (setBackgroundToken) {
            this.logger.debug("Set tokens for background.");
            this.extensionService.setToken(tokenInfo);
        }
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
        this.logger.debug("Remove all tokens.");
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
