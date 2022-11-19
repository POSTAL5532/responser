import React from "react";
import {User} from "app/model/User";
import {action, computed, makeAutoObservable, runInAction} from "mobx";
import LocalTokenStorageService from "app/service/authorization/LocalTokenStorageService";
import {UserService} from "app/service/UserService";

export class GlobalAppStore {

    userService: UserService = new UserService();

    currentUser: User = null;

    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);

        if (LocalTokenStorageService.isAccessTokenExist && LocalTokenStorageService.isRefreshTokenExist) {
            this.isLoading = true;
            this.refreshCurrentUser().finally(() => this.isLoading = false);
        }
    }

    @computed
    get isAuthorized(): boolean {
        return !!this.currentUser;
    }

    refreshCurrentUser = async () => {
        const user = await this.userService.getCurrentUser();
        runInAction(() => this.currentUser = user);
    }

    @action
    logoutAndClearCurrentUser = () => {
        LocalTokenStorageService.removeAllTokens();
        this.clearCurrentUser();
    }

    @action
    clearCurrentUser = () => {
        this.currentUser = null;
    }
}

export const GlobalAppStoreContext: React.Context<GlobalAppStore> = React.createContext<GlobalAppStore>(null);
