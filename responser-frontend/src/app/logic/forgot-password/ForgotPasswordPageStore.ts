import {makeAutoObservable} from "mobx";
import {useState} from "react";
import {ForgotPasswordPayload} from "../../model/ForgotPasswordPayload";
import {UserService} from "../../service/UserService";
import {Logger} from "../../utils/Logger";
import {ApiError, ApiErrorType} from "../../model/ApiError";

export class ForgotPasswordPageStore {

    private readonly logger: Logger = new Logger("ForgotPasswordPageStore");

    private readonly userService: UserService = new UserService();

    readonly forgotPasswordPayload: ForgotPasswordPayload = new ForgotPasswordPayload();

    readonly loadingState: ForgotPasswordPageStoreLoadingState = new ForgotPasswordPageStoreLoadingState();

    constructor() {
        makeAutoObservable(this);
    }

    public sendRestorePasswordLink = async (setFieldError?: (field: string, message: string) => void): Promise<boolean> => {
        this.loadingState.isDataSubmitting = true;
        this.logger.debug("Send restore password link - start.");

        try {
            await this.userService.sendRestorePasswordLink(this.forgotPasswordPayload);
        } catch (error) {
            if (error instanceof ApiError && error.errorType == ApiErrorType.VALIDATION_ERROR) {
                const apiError = error as ApiError;
                console.log("IS API ERROR")
                Object.keys(error.data).forEach(key => setFieldError(key, apiError.data[key]));
                return false;
            }

            console.log("IS NON API ERROR")
            throw error;
        } finally {
            this.loadingState.isDataSubmitting = false;
            this.logger.debug("Send restore password link - finish.");
        }

        return true;
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
