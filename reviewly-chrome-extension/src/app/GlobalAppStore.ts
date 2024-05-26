import React from "react";
import {action, computed, makeAutoObservable} from "mobx";
import {UserService} from "./service/UserService";
import {User} from "./model/User";
import LocalTokenStorageService from "./service/authorization/LocalTokenStorageService";
import {ExtensionService} from "./service/extension/ExtensionService";
import {reloadPage} from "./utils/NavigationUtils";
import {Logger} from "./utils/Logger";

export class GlobalAppStore {

    logger: Logger = new Logger("GlobalAppStore");

    extensionService: ExtensionService = new ExtensionService();

    userService: UserService = new UserService();

    currentUser: User = null;

    userDataLoading: boolean = true;

    errorsStore = new ErrorsStore();

    notificationsEnabled: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.init();
    }

    private init = async () => {
        this.logger.debug("Init store");

        window.addEventListener("error", errorEvent => {
            this.errorsStore.errors.push(errorEvent.error);
        });

        window.addEventListener("unhandledrejection", errorEvent => {
            this.errorsStore.errors.push(errorEvent.reason);
        });

        const tokenInfoResponse = await this.extensionService.getToken();
        LocalTokenStorageService.setTokenInfo(tokenInfoResponse.data);

        if (LocalTokenStorageService.isAccessTokenExist && LocalTokenStorageService.isRefreshTokenExist) {
            await this.updateCurrentUser();
        }

        this.notificationsEnabled = await this.extensionService.isNotificationsEnabled();

        this.userDataLoading = false;
    }

    @computed
    get isAuthorized(): boolean {
        return !!this.currentUser;
    }

    @action
    updateCurrentUser = async () => {
        try {
            this.logger.debug("Update current user info");
            this.currentUser = await this.userService.getCurrentUser();
        } catch (error: any) {
            this.logger.error("Update current user info - error:", error, ", remove tokens and reload page");
            LocalTokenStorageService.removeAllTokens();
            reloadPage();
        }
    }

    @action
    clearCurrentUser = () => {
        this.currentUser = null;
    }

    @action
    toggleNotifications = async () => {
        await this.extensionService.toggleNotifications(!this.notificationsEnabled);
        this.notificationsEnabled = !this.notificationsEnabled;
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
