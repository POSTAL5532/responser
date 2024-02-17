import {useState} from "react";
import {makeAutoObservable} from "mobx";
import {Logger} from "../../../utils/Logger";
import {UserService} from "../../../service/UserService";

export class EditUserAvatarStore {

    logger: Logger = new Logger("EditUserAvatarStore");

    userService: UserService = new UserService();

    rawUserAvatar: File;

    loadingState: EditUserProfilePageStoreLoadingState = new EditUserProfilePageStoreLoadingState();

    constructor() {
        makeAutoObservable(this);
    }

    public setUserRawAvatar = (data: File) => {
        this.rawUserAvatar = data;
    }

    public saveUserAvatar = async (data: string, blob: Blob) => {
        this.loadingState.isDataSubmitting = true;
        this.logger.debug("Save user avatar - start.");

        try {
            await this.userService.changeAvatar(blob);
        } catch (error: any) {
            throw error;
        } finally {
            this.loadingState.isDataSubmitting = false;
            this.logger.debug("Save user avatar - finish.");
        }
    }
}

export const useEditUserAvatarStore = (): EditUserAvatarStore => {
    const [editUserAvatarStore] = useState<EditUserAvatarStore>(new EditUserAvatarStore());
    return editUserAvatarStore;
}

export class EditUserProfilePageStoreLoadingState {

    isDataSubmitting: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }
}
