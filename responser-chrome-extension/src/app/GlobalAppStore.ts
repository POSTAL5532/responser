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

    constructor() {
        makeAutoObservable(this);
        this.init();
    }

    private init = async () => {
        this.logger.debug("Init store");

        const tokenInfoResponse = await this.extensionService.getToken();
        LocalTokenStorageService.setTokenInfo(tokenInfoResponse.data);

        if (LocalTokenStorageService.isAccessTokenExist && LocalTokenStorageService.isRefreshTokenExist) {
            await this.updateCurrentUser();
        }

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
}

export const GlobalAppStoreContext: React.Context<GlobalAppStore> = React.createContext<GlobalAppStore>(null);
