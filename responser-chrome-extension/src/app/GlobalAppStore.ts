import React from "react";
import {action, computed, makeAutoObservable} from "mobx";
import {UserService} from "./service/UserService";
import {User} from "./model/User";
import LocalTokenStorageService from "./service/authorization/LocalTokenStorageService";
import {ExtensionService} from "./service/extension/ExtensionService";

export class GlobalAppStore {

    extensionService: ExtensionService = new ExtensionService();

    userService: UserService = new UserService();

    currentUser: User = null;

    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.init();
    }

    private init = async () => {
        this.isLoading = true;

        const tokenInfoResponse = await this.extensionService.getToken();
        LocalTokenStorageService.setTokenInfo(tokenInfoResponse.data);

        if (LocalTokenStorageService.isAccessTokenExist && LocalTokenStorageService.isRefreshTokenExist) {
            await this.updateCurrentUser();
        }

        this.isLoading = false;
    }

    @computed
    get isAuthorized(): boolean {
        return !!this.currentUser;
    }

    @action
    updateCurrentUser = async () => {
        this.currentUser = await this.userService.getCurrentUser();
    }

    @action
    clearCurrentUser = () => {
        this.currentUser = null;
    }
}

export const GlobalAppStoreContext: React.Context<GlobalAppStore> = React.createContext<GlobalAppStore>(null);
