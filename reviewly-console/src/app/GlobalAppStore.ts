import React from "react";
import {User} from "./model/User";
import {action, computed, makeAutoObservable, runInAction} from "mobx";
import {reloadPage} from "./utils/NavigationUtils";
import {Logger} from "./utils/Logger";
import LocalTokenStorageService from "./service/authorization/LocalTokenStorageService";
import {UserService} from "./service/UserService";

export class GlobalAppStore {

    logger: Logger = new Logger("GlobalAppStore");

    userService: UserService = new UserService();

    currentUser: User = null;

    isLoading: boolean = false;

    errorsStore = new ErrorsStore();

    appPageClassName: string = null;

    constructor() {
        makeAutoObservable(this);
        this.init();
    }

    init = async () => {
        this.logger.debug("Init global app store");

        window.addEventListener("error", errorEvent => {
            this.errorsStore.errors.push(errorEvent.error);
        });

        window.addEventListener("unhandledrejection", errorEvent => {
            this.errorsStore.errors.push(errorEvent.reason);
        });

        if (LocalTokenStorageService.isAccessTokenExist && LocalTokenStorageService.isRefreshTokenExist) {
            this.isLoading = true;
            await this.refreshCurrentUser().finally(() => this.isLoading = false);
        }
    }

    refreshCurrentUser = async () => {
        try {
            this.logger.debug("Update current user info");
            const user = await this.userService.getCurrentUser();
            runInAction(() => this.currentUser = user);
            this.logger.debug("Current user info updated");
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
