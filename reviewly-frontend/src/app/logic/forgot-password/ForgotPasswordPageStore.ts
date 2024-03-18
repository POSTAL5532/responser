import {makeAutoObservable} from "mobx";
import {useState} from "react";
import {ForgotPasswordPayload} from "../../model/ForgotPasswordPayload";
import {UserService} from "../../service/UserService";
import {Logger} from "../../utils/Logger";
import {isValidationError, setErrorsToFields} from "../../utils/ErrorUtils";

export class ForgotPasswordPageStore {

    private readonly logger: Logger = new Logger("ForgotPasswordPageStore");

    private readonly userService: UserService = new UserService();

    readonly forgotPasswordPayload: ForgotPasswordPayload;

    readonly loadingState: ForgotPasswordPageStoreLoadingState = new ForgotPasswordPageStoreLoadingState();

    constructor() {
        makeAutoObservable(this);
        this.forgotPasswordPayload = new ForgotPasswordPayload();
        this.forgotPasswordPayload.email = "";
    }

    public sendRestorePasswordLink = async (setFieldError?: (field: string, message: string) => void): Promise<boolean> => {
        this.loadingState.isDataSubmitting = true;
        this.logger.debug("Send restore password link - start.");

        try {
            await this.userService.sendRestorePasswordLink(this.forgotPasswordPayload);
        } catch (error: any) {
            if (isValidationError(error)) {
                setErrorsToFields(error, setFieldError);
                this.logger.debug("Send restore password link - validation error.");
                return false;
            }
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
