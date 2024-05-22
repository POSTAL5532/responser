import axios, {AxiosRequestConfig} from "axios";
import CryptoJS from 'crypto-js';
import ApplicationProperties from "../ApplicationProperties";
import TokenStore from "../../service/authorization/LocalTokenStorageService";
import {Logger} from "../../utils/Logger";
import {TokenInfo} from "../../model/TokenInfo";

/**
 * Authorization service.
 */
class AuthorizationService {

    /**
     * Refresh token request promise. Uses like a request in process flag.
     */
    refreshAccessTokenPromise: Promise<TokenInfo> = null;

    logger: Logger = new Logger("AuthorizationService");

    /**
     * Returns refreshed access token from auth-server.
     */
    refreshAccessToken = (): Promise<TokenInfo> => {
        this.logger.debug("Refresh access token - start");
        this.refreshAccessTokenPromise = this.refreshAccessTokenRequest()
            .finally(() => {
                this.logger.debug("Refresh access token - finish");
                this.refreshAccessTokenPromise = null;
            });

        return this.refreshAccessTokenPromise;
    }

    private refreshAccessTokenRequest = async (): Promise<TokenInfo> => {
        const payload = `refresh_token=${TokenStore.refreshToken}&grant_type=refresh_token`;
        const data = await this.executePostRequest(ApplicationProperties.tokenApiUrl, payload);
        return TokenInfo.deserialize(data);
    }

    private executePostRequest = async (url: string, body: string): Promise<any> => {
        const options: AxiosRequestConfig = {
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                ...TokenStore.basicAuthorizationHeader
            }
        };

        const response = await axios.post(url, body, options);
        return response.data;
    }

    public getSimpleAuthHeader = (url: string): string[] => {
        const currentLocalDate = (new Date()).toISOString();
        const salt = this.generateSalt();
        const message = `${ApplicationProperties.apiUrl}${url}${currentLocalDate}${salt}`;
        const hash = CryptoJS.SHA256(message).toString();

        return [hash, currentLocalDate, salt]
    }

    private generateSalt(): string {
        return CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
    }
}

export default new AuthorizationService();
