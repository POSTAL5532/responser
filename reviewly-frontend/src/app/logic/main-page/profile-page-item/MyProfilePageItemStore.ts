import {useState} from "react";
import {computed, makeAutoObservable} from "mobx";
import {Logger} from "../../../utils/Logger";
import {UserService} from "../../../service/UserService";
import {User} from "../../../model/User";
import {UpdateUserPayload} from "../../../model/UpdateUserPayload";
import {isValidationError, setErrorsToFields} from "../../../utils/ErrorUtils";
import {EmailConfirmationService} from "../../../service/EmailConfirmationService";

export class MyProfilePageItemStore {

    logger: Logger = new Logger("MyProfilePageItemStore");

    userService: UserService = new UserService();

    currentUser: User;

    updateUserPayload: UpdateUserPayload;

    emailConfirmationService: EmailConfirmationService = new EmailConfirmationService();

    isConfirmationResent: boolean = false;

    loadingState: MyProfilePageItemLoadingState = new MyProfilePageItemLoadingState();

    constructor() {
        makeAutoObservable(this);
    }

    public init = async (currentUser: User) => {
        this.logger.debug("Init store: currentUser =", currentUser);
        this.currentUser = currentUser;
        await this.initUpdateUserPayload();
    }

    public initUpdateUserPayload = async () => {
        this.logger.debug("Init update user payload - start.");

        let currentUser: User;

        try {
            currentUser = await this.userService.getCurrentUser();
        } catch (error: any) {
            this.logger.error("Init update user payload - error.");
            throw error;
        } finally {
            this.logger.debug("Init update user payload - finish.");
        }

        this.currentUser = currentUser;

        this.updateUserPayload = new UpdateUserPayload();
        this.updateUserPayload.email = currentUser.email;
        this.updateUserPayload.fullName = currentUser.fullName;
    }

    @computed
    get userWasChanged(): boolean {
        if (!this.currentUser || !this.updateUserPayload) {
            return false;
        }

        return this.currentUser.email !== this.updateUserPayload.email ||
            this.currentUser.fullName !== this.updateUserPayload.fullName;
    }

    public updateUser = async (setFieldError?: (field: string, message: string) => void): Promise<boolean> => {
        this.loadingState.isDataSubmitting = true;
        this.logger.debug("Update user - start.");

        try {
            await this.userService.updateUser(this.updateUserPayload);
        } catch (error: any) {
            if (isValidationError(error)) {
                setErrorsToFields(error, setFieldError);
                this.logger.error("Update user - validation error");
                return false;
            }

            throw error;
        } finally {
            this.loadingState.isDataSubmitting = false;
            this.logger.debug("Update user - finish.");
        }

        return true;
    }

    public resendConfirmationEmail = async () => {
        this.logger.debug("Resend confirmation email - start.");
        this.loadingState.resendConfirmationProcess = true;

        try {
            await this.emailConfirmationService.resendConfirmationEmail();
            this.isConfirmationResent = true;
            this.logger.debug("Resend confirmation email - finish.");
        } finally {
            this.loadingState.resendConfirmationProcess = false;
        }
    }
}

export const useMyProfilePageItemStore = (): MyProfilePageItemStore => {
    const [myProfilePageItemStore] = useState<MyProfilePageItemStore>(new MyProfilePageItemStore());
    return myProfilePageItemStore;
}

export class MyProfilePageItemLoadingState {

    isDataSubmitting: boolean = false;

    resendConfirmationProcess: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }
}
