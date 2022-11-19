import axios, {AxiosRequestConfig} from "axios";
import ApplicationProperties from "app/service/ApplicationProperties";
import {TokenInfo} from "app/model/TokenInfo";
import TokenStore from "app/service/authorization/LocalTokenStorageService";
import {navigateTo} from "../../utils/NavigationUtils";

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

    exchangeAuthCode = (authCode: string): Promise<TokenInfo> => {
        this.accessTokenPromise = this.exchangeAuthCodeRequest(authCode)
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

    requestLoginPage = (): void => {
        const url = new URL(ApplicationProperties.authLoginPageUrl);
        url.searchParams.set("response_type", "code");
        url.searchParams.set("client_id", ApplicationProperties.clientId);
        url.searchParams.set("redirect_uri", ApplicationProperties.authRedirectUri);
        navigateTo(url.toString(), true);
    }

    private exchangeAuthCodeRequest = async (code: string): Promise<TokenInfo> => {
        const payload = `redirect_uri=${ApplicationProperties.authRedirectUri}&code=${code}&grant_type=authorization_code`;
        const data = await this.executePostRequest(ApplicationProperties.authTokenUrl, payload);
        return TokenInfo.deserialize(data);
    }

    private refreshAccessTokenRequest = async (): Promise<TokenInfo> => {
        const payload = `refresh_token=${TokenStore.refreshToken}&grant_type=refresh_token`;
        const data = await this.executePostRequest(ApplicationProperties.authTokenUrl, payload);
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
}

export default new AuthorizationService();
