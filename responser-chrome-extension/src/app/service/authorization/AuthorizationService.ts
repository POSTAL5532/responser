import axios, {AxiosRequestConfig} from "axios";
import {LoginPayload} from "app/service/authorization/LoginPayload";
import ApplicationProperties from "app/service/ApplicationProperties";
import {TokenInfo} from "app/model/TokenInfo";
import TokenStore from "app/service/authorization/LocalTokenStorageService";

const AUTH_TOKEN_PATH = "/token";

/**
 * Authorization service.
 */
class AuthorizationService {

    /**
     * Access token request promise. Uses like a request in process flag.
     */
    accessTokenPromise: Promise<TokenInfo> = null;

    /**
     * Refresh token request promise. Uses like a request in process flag.
     */
    refreshAccessTokenPromise: Promise<TokenInfo> = null;

    /**
     * Returns access token from auth-server.
     *
     * @param loginPayload
     */
    getAccessToken = (loginPayload: LoginPayload): Promise<TokenInfo> => {
        this.accessTokenPromise = this.accessTokenRequest(loginPayload)
            .finally(() => {
                this.accessTokenPromise = null;
            });

        return this.accessTokenPromise;
    }

    /**
     * Returns refreshed access token from auth-server.
     */
    refreshAccessToken = (): Promise<TokenInfo> => {
        this.refreshAccessTokenPromise = this.refreshAccessTokenRequest()
            .finally(() => {
                this.refreshAccessTokenPromise = null;
            });

        return this.refreshAccessTokenPromise;
    }

    private accessTokenRequest = async (loginPayload: LoginPayload): Promise<TokenInfo> => {
        const payload = `username=${loginPayload.email}&password=${loginPayload.password}&grant_type=password`;
        const data = await this.executePostRequest(AUTH_TOKEN_PATH, payload);
        return TokenInfo.deserialize(data);
    }

    private refreshAccessTokenRequest = async (): Promise<TokenInfo> => {
        const payload = `refresh_token=${TokenStore.refreshToken}&grant_type=refresh_token`;
        const data = await this.executePostRequest(AUTH_TOKEN_PATH, payload);
        return TokenInfo.deserialize(data);
    }

    private executePostRequest = async (url: string, body: string): Promise<any> => {
        const options: AxiosRequestConfig = {
            baseURL: ApplicationProperties.authServerUrl,
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                ...TokenStore.basicAuthorizationHeader
            }
        };

        const response = await axios.post(url, body, options);
        return response.data;
    }
}

export default new AuthorizationService();
