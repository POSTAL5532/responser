import {useState} from "react";
import {computed, makeAutoObservable} from "mobx";
import {Logger} from "../../utils/Logger";
import {UserService} from "../../service/UserService";
import {UpdateUserPayload} from "../../model/UpdateUserPayload";
import {User} from "../../model/User";
import {UpdateUserPasswordPayload} from "../../model/UpdateUserPasswordPayload";

export class EditUserProfilePageStore {

    logger: Logger = new Logger("EditUserProfilePageStore");

    userService: UserService = new UserService();

    currentUser: User;

    updateUserPayload: UpdateUserPayload;

    updateUserPasswordPayload: UpdateUserPasswordPayload;

    loadingState: EditUserPageStoreLoadingState = new EditUserPageStoreLoadingState();

    constructor() {
        makeAutoObservable(this);
    }

    public init = async (currentUser: User) => {
        this.logger.debug("Init store: currentUser =", currentUser);
        this.currentUser = currentUser;
        this.initUpdateUserPasswordPayload();
        await this.initUpdateUserPayload();
    }

    public initUpdateUserPayload = async () => {
        this.logger.debug("Init update user payload - start.");

        const currentUser: User = await this.userService.getCurrentUser()
        .finally(() => {
            this.logger.debug("Init update user payload - finish.");
        });

        this.currentUser = currentUser;

        this.updateUserPayload = new UpdateUserPayload();
        this.updateUserPayload.userName = currentUser.userName;
        this.updateUserPayload.email = currentUser.email;
        this.updateUserPayload.fullName = currentUser.fullName;
    }

    public initUpdateUserPasswordPayload = () => {
        this.updateUserPasswordPayload = new UpdateUserPasswordPayload();
    }

    @computed
    get userWasChanged(): boolean {
        if (!this.currentUser || !this.updateUserPayload) {
            return false;
        }

        return this.currentUser.email !== this.updateUserPayload.email ||
            this.currentUser.userName !== this.updateUserPayload.userName ||
            this.currentUser.fullName !== this.updateUserPayload.fullName;
    }

    @computed
    get passwordsFilled(): boolean {
        if (!this.updateUserPasswordPayload) {
            return false;
        }

        return !!this.updateUserPasswordPayload.oldPassword &&
            !!this.updateUserPasswordPayload.newPassword &&
            !!this.updateUserPasswordPayload.confirmNewPassword;
    }

    public updateUser = async (setFieldError?: (field: string, message: string) => void): Promise<void> => {
        this.loadingState.isDataSubmitting = true;
        this.logger.debug("Update user - start.");

        await this.userService.updateUser(this.updateUserPayload)
        .catch(error => {
            Object.keys(error.data).forEach(key => setFieldError(key, error.data[key]));
            throw error;
        })
        .finally(() => {
            this.loadingState.isDataSubmitting = false;
            this.logger.debug("Update user - finish.");
        });
    }

    public updatePassword = async (setFieldError?: (field: string, message: string) => void): Promise<void> => {
        this.loadingState.isDataSubmitting = true;
        this.logger.debug("Update user password - start.");

        await this.userService.updatePassword(this.updateUserPasswordPayload)
        .catch(error => {
            Object.keys(error.data).forEach(key => setFieldError(key, error.data[key]));
            throw error;
        })
        .finally(() => {
            this.loadingState.isDataSubmitting = false;
            this.logger.debug("Update user password - finish.");
        });
    }
}

export const useEditUserPageStore = (): EditUserProfilePageStore => {
    const [editUserPageStore] = useState<EditUserProfilePageStore>(new EditUserProfilePageStore());
    return editUserPageStore;
}

export class EditUserPageStoreLoadingState {

    isDataSubmitting: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }
}
