import {computed, makeAutoObservable} from "mobx";
import {useState} from "react";
import {UpdateUserPasswordPayload} from "../../../model/UpdateUserPasswordPayload";
import {isValidationError, setErrorsToFields} from "../../../utils/ErrorUtils";
import {Logger} from "../../../utils/Logger";
import {UserService} from "../../../service/UserService";

export class SecurityPageItemStore {

    logger: Logger = new Logger("SecurityPageItemStore");

    userService: UserService = new UserService();

    updateUserPasswordPayload: UpdateUserPasswordPayload = new UpdateUserPasswordPayload();

    loadingState: SecurityPageItemStoreLoadingState = new SecurityPageItemStoreLoadingState();

    currentUserUsesStubPassword: boolean;

    constructor(currentUserUsesStubPassword: boolean) {
        makeAutoObservable(this);
        this.currentUserUsesStubPassword = currentUserUsesStubPassword;
    }

    @computed
    get passwordsFilled(): boolean {
        if (!this.updateUserPasswordPayload) {
            return false;
        }

        return (!!this.updateUserPasswordPayload.oldPassword || this.currentUserUsesStubPassword) &&
            !!this.updateUserPasswordPayload.newPassword &&
            !!this.updateUserPasswordPayload.confirmNewPassword;
    }

    public updatePassword = async (setFieldError?: (field: string, message: string) => void): Promise<boolean> => {
        this.loadingState.isPasswordUpdating = true;
        this.logger.debug("Update user password - start.");

        try {
            await this.userService.updatePassword(this.updateUserPasswordPayload);
        } catch (error: any) {
            if (isValidationError(error)) {
                setErrorsToFields(error, setFieldError);
                this.logger.error("Update user password - validation error");
                return false;
            }

            throw error;
        } finally {
            this.loadingState.isPasswordUpdating = false;
            this.logger.debug("Update user password - finish.");
        }

        return true;
    }
}

export const useSecurityPageItemStore = (currentUserUsesStubPassword: boolean): SecurityPageItemStore => {
    const [securityPageItemStore] = useState<SecurityPageItemStore>(new SecurityPageItemStore(currentUserUsesStubPassword));
    return securityPageItemStore;
}

export class SecurityPageItemStoreLoadingState {

    isPasswordUpdating: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }
}
