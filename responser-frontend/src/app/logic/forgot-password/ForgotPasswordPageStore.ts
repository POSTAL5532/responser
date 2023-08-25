import {makeAutoObservable} from "mobx";
import {useState} from "react";
import {ForgotPasswordPayload} from "../../model/ForgotPasswordPayload";
import {UserService} from "../../service/UserService";
import {Logger} from "../../utils/Logger";

export class ForgotPasswordPageStore {

    private readonly logger: Logger = new Logger("ForgotPasswordPageStore");

    userService: UserService = new UserService();

    forgotPasswordPayload: ForgotPasswordPayload = new ForgotPasswordPayload();

    loadingState: ForgotPasswordPageStoreLoadingState = new ForgotPasswordPageStoreLoadingState();

    constructor() {
        makeAutoObservable(this);
    }

    public sendRestorePasswordLink = async (setFieldError?: (field: string, message: string) => void): Promise<void> => {
        this.loadingState.isDataSubmitting = true;
        this.logger.debug("Send restore password link - start.");

        await this.userService.sendRestorePasswordLink(this.forgotPasswordPayload)
        .catch(error => {
            Object.keys(error.data).forEach(key => setFieldError(key, error.data[key]));
            throw error;
        })
        .finally(() => {
            this.loadingState.isDataSubmitting = false;
            this.logger.debug("Send restore password link - finish.");
        });
    }
}

export const useForgotPasswordPageStore = (): ForgotPasswordPageStore => {
    const [forgotPasswordPageStore] = useState<ForgotPasswordPageStore>(new ForgotPasswordPageStore());
    return forgotPasswordPageStore;
}

export class ForgotPasswordPageStoreLoadingState {

    isDataSubmitting: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }
}
