import {makeAutoObservable} from "mobx";
import {LoginPayload} from "app/service/authorization/LoginPayload";
import TokenStore from "app/service/authorization/LocalTokenStorageService";
import AuthorizationService from "app/service/authorization/AuthorizationService";

/**
 * Login page store.
 */
export class LoginPageStore {

    /**
     * Login request data model.
     */
    loginPayload: LoginPayload = new LoginPayload();

    badCredentials: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * Runs login process.
     */
    login = (): Promise<void> => {
        return AuthorizationService.getAccessToken(this.loginPayload)
            .then(tokenInfo => {
                TokenStore.setToken(tokenInfo);
                window.location.reload();
            }).catch(() => {
                this.badCredentials = true
            });
    }
}
