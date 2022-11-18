import axios, {AxiosRequestConfig} from "axios";
import ApplicationProperties from "app/service/ApplicationProperties";
import {TokenInfo} from "app/model/TokenInfo";
import TokenStore from "app/service/authorization/LocalTokenStorageService";

/**
 * Authorization service.
 */
class AuthorizationService {

    /**
     * Refresh token request promise. Uses like a request in process flag.
     */
    refreshAccessTokenPromise: Promise<TokenInfo> = null;

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

    private refreshAccessTokenRequest = async (): Promise<TokenInfo> => {
        const payload = `refresh_token=${TokenStore.refreshToken}&grant_type=refresh_token`;
        const data = await this.executePostRequest(payload);
        return TokenInfo.deserialize(data);
    }

    private executePostRequest = async (body: string): Promise<any> => {
        const options: AxiosRequestConfig = {
            baseURL: ApplicationProperties.tokenApiUrl,
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                ...TokenStore.basicAuthorizationHeader
            }
        };

        const response = await axios.post("/", body, options);
        return response.data;
    }
}

export default new AuthorizationService();
