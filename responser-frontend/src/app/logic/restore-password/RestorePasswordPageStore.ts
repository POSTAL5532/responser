import {computed, makeAutoObservable} from "mobx";
import {useState} from "react";
import {UserService} from "../../service/UserService";
import {RestorePasswordPayload} from "../../model/RestorePasswordPayload";
import {Logger} from "../../utils/Logger";
import {ApiError, ApiErrorType} from "../../model/ApiError";

export class RestorePasswordPageStore {

    private readonly logger: Logger = new Logger("RestorePasswordPageStore");

    private readonly userService: UserService = new UserService();

    readonly restorePasswordPayload: RestorePasswordPayload;

    readonly loadingState: RestorePasswordPageStoreLoadingState = new RestorePasswordPageStoreLoadingState();

    constructor(restorePasswordId: string) {
        makeAutoObservable(this);
        this.restorePasswordPayload = new RestorePasswordPayload(restorePasswordId);
    }

    @computed
    get passwordsFilled(): boolean {
        if (!this.restorePasswordPayload) {
            return false;
        }

        return !!this.restorePasswordPayload.newPassword && !!this.restorePasswordPayload.confirmNewPassword;
    }

    public restorePassword = async (setFieldError?: (field: string, message: string) => void) => {
        this.loadingState.isDataSubmitting = true;
        this.logger.debug("Password restoring - start.");

        await this.userService.restorePassword(this.restorePasswordPayload)
        .catch(error => {
            if (error instanceof ApiError && error.errorType == ApiErrorType.VALIDATION_ERROR) {
                Object.keys(error.data).forEach(key => setFieldError(key, error.data[key]));
            } else {
                throw error;
            }
        })
        .finally(() => {
            this.loadingState.isDataSubmitting = false;
            this.logger.debug("Password restoring - finish.");
        });
    }
}

export const useRestorePasswordPageStore = (restorePasswordId: string): RestorePasswordPageStore => {
    const [restorePasswordPageStore] = useState<RestorePasswordPageStore>(new RestorePasswordPageStore(restorePasswordId));
    return restorePasswordPageStore;
}

export class RestorePasswordPageStoreLoadingState {

    isDataSubmitting: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }
}
