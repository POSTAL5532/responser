import axios, {AxiosRequestConfig} from 'axios';
import {ApiError} from "../model/ApiError";
import {nativeNavigateToAuthLogoutPageUrl} from "../utils/NavigationUtils";
import {Logger} from "../utils/Logger";
import {TokenInfo} from "../model/TokenInfo";
import AuthorizationService from "./authorization/AuthorizationService";
import LocalTokenStorageService from "./authorization/LocalTokenStorageService";
import ApplicationProperties from "./ApplicationProperties";

const apiClientLogger: Logger = new Logger("ApiClient");

const refreshTokenIfNeeded = (): Promise<TokenInfo> => {
    if (!AuthorizationService.refreshAccessTokenPromise) {
        apiClientLogger.debug("Try to refresh token.");
        AuthorizationService.refreshAccessToken()
            .then(token => {
                apiClientLogger.debug("Token refreshed");
                LocalTokenStorageService.setToken(token)
            })
            .catch(() => {
                apiClientLogger.warning("Refresh token error - log out");
                LocalTokenStorageService.removeAllTokens();
                nativeNavigateToAuthLogoutPageUrl();
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

    getRequestConfig = (url: string, requestOptions: AxiosRequestConfig = {}): AxiosRequestConfig => {
        const [token, date, salt] = AuthorizationService.getSimpleAuthHeader(url);
        let headers: any = {
            "Content-type": "application/json",
            "X-Request-Id": token,
            "X-Request-Current-Local-Date": date,
            "X-Request-Config": salt
        };

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
        const response = await axios.get<T>(url, this.getRequestConfig(url, requestOptions));
        return response.data;
    }

    executePostRequest = async <T = any, B = any>(url: string, body?: B, requestOptions?: AxiosRequestConfig): Promise<T> => {
        const response = await axios.post<T>(url, body, this.getRequestConfig(url, requestOptions));
        return response.data;
    }

    executePutRequest = async <T = any, B = any>(url: string, body: B, requestOptions?: AxiosRequestConfig): Promise<T> => {
        const response = await axios.put<T>(url, body, this.getRequestConfig(url, requestOptions));
        return response.data;
    }

    executeDeleteRequest = async <T = any>(url: string, requestOptions?: AxiosRequestConfig): Promise<T> => {
        const response = await axios.delete<T>(url, this.getRequestConfig(url, requestOptions));
        return response.data;
    }
}
