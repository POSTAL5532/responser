import React from "react";
import {User} from "app/model/User";
import {action, computed, makeAutoObservable, runInAction} from "mobx";
import LocalTokenStorageService from "app/service/authorization/LocalTokenStorageService";
import {UserService} from "app/service/UserService";
import {reloadPage} from "./utils/NavigationUtils";
import {Logger} from "./utils/Logger";
import {setCookie} from "./utils/CookieUtils";

export class GlobalAppStore {

    logger: Logger = new Logger("GlobalAppStore");

    userService: UserService = new UserService();

    currentUser: User = null;

    isLoading: boolean = false;

    hideHeader: boolean = false;

    errorsStore = new ErrorsStore();

    appPageClassName: string = null;

    constructor() {
        makeAutoObservable(this);
        this.init();
    }

    init = () => {
        this.logger.debug("Init global app store");

        window.addEventListener("error", errorEvent => {
            this.errorsStore.errors.push(errorEvent.error);
        });

        window.addEventListener("unhandledrejection", errorEvent => {
            this.errorsStore.errors.push(errorEvent.reason);
        });

        if (LocalTokenStorageService.isAccessTokenExist && LocalTokenStorageService.isRefreshTokenExist) {
            this.isLoading = true;
            this.refreshCurrentUser().finally(() => this.isLoading = false);
        }
    }

    refreshCurrentUser = async () => {
        try {
            this.logger.debug("Update current user info");
            const user = await this.userService.getCurrentUser();
            runInAction(() => this.currentUser = user);
            setCookie("userFullName", this.currentUser.fullName, {path: "/"});
        } catch (error: any) {
            this.logger.error("Update current user info - error:", error, ", remove tokens and reload page");
            LocalTokenStorageService.removeAllTokens();
            reloadPage();
        }
    }

    @action
    logoutAndClearCurrentUser = () => {
        this.logger.debug("Remove tokens and clear user info");
        LocalTokenStorageService.removeAllTokens();
        this.clearCurrentUser();
    }

    @action
    clearCurrentUser = () => {
        this.currentUser = null;
    }
}

export const GlobalAppStoreContext: React.Context<GlobalAppStore> = React.createContext<GlobalAppStore>(null);

export class ErrorsStore {

    errors: any[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    @computed
    get hasErrors(): boolean {
        return this.errors.length > 0;
    }
}
