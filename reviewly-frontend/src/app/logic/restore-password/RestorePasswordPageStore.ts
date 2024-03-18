import {computed, makeAutoObservable} from "mobx";
import {useState} from "react";
import {UserService} from "../../service/UserService";
import {RestorePasswordPayload} from "../../model/RestorePasswordPayload";
import {Logger} from "../../utils/Logger";
import {isValidationError, setErrorsToFields} from "../../utils/ErrorUtils";

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

    public restorePassword = async (setFieldError?: (field: string, message: string) => void): Promise<boolean> => {
        this.loadingState.isDataSubmitting = true;
        this.logger.debug("Password restoring - start.");

        try {
            await this.userService.restorePassword(this.restorePasswordPayload);
        } catch (error: any) {
            if (isValidationError(error)) {
                setErrorsToFields(error, setFieldError);
                this.logger.debug("Password restoring - validation error.");
                return false;
            }
            throw error;
        } finally {
            this.loadingState.isDataSubmitting = false;
            this.logger.debug("Password restoring - finish.");
        }

        return true;
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
