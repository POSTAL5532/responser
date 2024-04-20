import {TokenInfo} from "../model/TokenInfo";
import axios, {AxiosRequestConfig} from 'axios';
import LocalTokenStorageService from "./authorization/LocalTokenStorageService";
import AuthorizationService from "./authorization/AuthorizationService";
import ApplicationProperties from "./ApplicationProperties";
import {reloadPage} from "../utils/NavigationUtils";
import {ApiError} from "../model/ApiError";
import {Logger} from "../utils/Logger";

const apiClientLogger: Logger = new Logger("ApiClient");

const refreshTokenIfNeeded = (): Promise<TokenInfo> => {
    if (!AuthorizationService.refreshAccessTokenPromise) {
        apiClientLogger.debug("Try to refresh token.");
        AuthorizationService.refreshAccessToken()
            .then(tokenInfo => {
                apiClientLogger.debug("Token refreshed");
                LocalTokenStorageService.setTokenInfo(tokenInfo, true);
            })
            .catch(() => {
                LocalTokenStorageService.removeAllTokens();
                apiClientLogger.warning("Refresh token error - remove tokens and refresh frame.");
                reloadPage();
            });
    }

    return AuthorizationService.refreshAccessTokenPromise;
}

const errorInterceptor = (error: any): Promise<any> => {
    const {response: {status, data}} = error;

    apiClientLogger.error(`The server respond with a status code ${status}`);

    if (status === 401 && error.config && error.config.repeatableRequest !== false) {
        return refreshTokenIfNeeded()
            .then(() => {
                error.config.repeatableRequest = false;
                error.config.headers = {
                    ...error.config.headers,
                    ...LocalTokenStorageService.authorizationHeader
                };

                return axios.request(error.config);
            });
    } else if (data?.apiError) {
        const apiError: ApiError = new ApiError(data.apiError, data.message, data.errorType, data.data);
        apiClientLogger.error("Api request error:", apiError.message, apiError.errorType);
        return Promise.reject(apiError);
    }

    apiClientLogger.error("Request error", data);
    return Promise.reject(error);
}

axios.interceptors.response.use(undefined, errorInterceptor);

/**
 * Api client. Executes api requests to gateway.
 */
export class ApiClient {

    getRequestConfig = (requestOptions: AxiosRequestConfig = {}): AxiosRequestConfig => {
        let headers: any = {"Content-type": "application/json"}

        if (LocalTokenStorageService.isAccessTokenExist) {
            headers = {...headers, ...LocalTokenStorageService.authorizationHeader}
        }

        return {
            baseURL: ApplicationProperties.apiUrl,
            headers: {
                ...headers
            },
            ...requestOptions
        }
    }

    executeGetRequest = async <T = any>(url: string, requestOptions?: AxiosRequestConfig): Promise<T> => {
        const response = await axios.get<T>(url, this.getRequestConfig(requestOptions));
        return response.data;
    }

    executePostRequest = async <T = any, B = any>(url: string, body: B, requestOptions?: AxiosRequestConfig): Promise<T> => {
        const response = await axios.post<T>(url, body, this.getRequestConfig(requestOptions));
        return response.data;
    }

    executePutRequest = async <T = any, B = any>(url: string, body: B, requestOptions?: AxiosRequestConfig): Promise<T> => {
        const response = await axios.put<T>(url, body, this.getRequestConfig(requestOptions));
        return response.data;
    }

    executeDeleteRequest = async <T = any>(url: string, requestOptions?: AxiosRequestConfig): Promise<T> => {
        const response = await axios.delete<T>(url, this.getRequestConfig(requestOptions));
        return response.data;
    }
}
