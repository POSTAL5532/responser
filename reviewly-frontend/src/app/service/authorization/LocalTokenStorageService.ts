import {TokenInfo} from "app/model/TokenInfo";
import ApplicationProperties from "app/service/ApplicationProperties";
import {Logger} from "../../utils/Logger";
import {removeCookie} from "../../utils/CookieUtils";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const TOKEN_TYPE_KEY = "token_type";
const EXPIRES_IN_KEY = "expires_in";

/**
 * Token sore. Contains read/write/delete methods.
 */
class LocalTokenStorageService {

    logger: Logger = new Logger("LocalTokenStorageService");

    get accessToken(): string {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    }

    set accessToken(token: string) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }

    removeAccessToken() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    }

    get isAccessTokenExist(): boolean {
        return !!this.accessToken;
    }

    get refreshToken(): string {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    }

    set refreshToken(refreshToken: string) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }

    removeRefreshToken() {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    }

    get isRefreshTokenExist(): boolean {
        return !!this.refreshToken;
    }

    get tokenType(): string {
        return localStorage.getItem(TOKEN_TYPE_KEY);
    }

    set tokenType(tokenType: string) {
        localStorage.setItem(TOKEN_TYPE_KEY, tokenType);
    }

    removeTokenType() {
        localStorage.removeItem(TOKEN_TYPE_KEY);
    }

    get expiresIn(): number {
        const value = localStorage.getItem(EXPIRES_IN_KEY);
        return value ? Number.parseInt(value) : 0;
    }

    set expiresIn(expiresIn: number) {
        localStorage.setItem(EXPIRES_IN_KEY, expiresIn.toString());
    }

    removeExpiresIn() {
        localStorage.removeItem(EXPIRES_IN_KEY);
    }

    /**
     * Returns all token info in {@link TokenInfo} object from local storage.
     */
    get tokenInfo(): TokenInfo {
        return {
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            tokenType: this.tokenType,
            expiresIn: this.expiresIn
        }
    }

    /**
     * Save all token info from {@link TokenInfo} object to local storage.
     */
    setToken = (tokenInfo: TokenInfo) => {
        this.logger.debug("Set tokens.");
        this.accessToken = tokenInfo.accessToken;
        this.refreshToken = tokenInfo.refreshToken;
        this.tokenType = tokenInfo.tokenType;
        this.expiresIn = tokenInfo.expiresIn;
    }

    /**
     * Removes all info about token from local storage.
     */
    removeAllTokens() {
        this.logger.debug("Remove all tokens.");
        this.removeAccessToken();
        this.removeRefreshToken();
        this.removeTokenType();
        this.removeExpiresIn();
        removeCookie("userFullName");
    }

    get basicAuthorizationHeader(): any {
        return {"Authorization": `Basic ${btoa(ApplicationProperties.clientId + ":" + ApplicationProperties.clientSecret)}`};
    }

    get authorizationHeader(): any {
        return {"Authorization": `Bearer ${this.accessToken}`};
    }
}

export default new LocalTokenStorageService();
