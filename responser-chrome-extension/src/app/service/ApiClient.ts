import {TokenInfo} from "app/model/TokenInfo";
import axios, {AxiosRequestConfig} from 'axios';
import LocalTokenStorageService from "./authorization/LocalTokenStorageService";
import AuthorizationService from "./authorization/AuthorizationService";
import ApplicationProperties from "./ApplicationProperties";
import {reloadPage} from "../utils/NavigationUtils";
import {ApiError} from "../model/ApiError";

const refreshTokenIfNeeded = (): Promise<TokenInfo> => {
    if (!AuthorizationService.refreshAccessTokenPromise) {
        AuthorizationService.refreshAccessToken()
            .then(tokenInfo => {
                LocalTokenStorageService.setTokenInfo(tokenInfo, true);
            })
            .catch(() => {
                LocalTokenStorageService.removeAllTokens();
                reloadPage();
            });
    }

    return AuthorizationService.refreshAccessTokenPromise;
}

const errorInterceptor = (error: any): Promise<any> => {
    const {response: {status, data}} = error;

    console.error(`[ApiClient]: The server responded with a status code ${status}`);

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
        return Promise.reject(data as ApiError);
    }

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
            baseURL: ApplicationProperties.gatewayApiUrl,
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
