import {useState} from "react";
import {makeAutoObservable} from "mobx";
import {Logger} from "../../utils/Logger";
import {isValidationError, setErrorsToFields} from "../../utils/ErrorUtils";
import {UserAccountDataPayload} from "../../model/UserAccountDataPayload";
import {UserService} from "../../service/UserService";

/**
 * Sign up page store.
 */
export class SignUpPageStore {

    logger: Logger = new Logger("SignUpPageStore");

    /**
     * Sign up request data model.
     */
    signUpPayload: UserAccountDataPayload = new UserAccountDataPayload();

    userService: UserService = new UserService();

    signUpInProcess: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * Runs sign up process.
     */
    signUp = async (setFieldError?: (field: string, message: string) => void): Promise<void> => {
        this.logger.debug("Sign up new user - start");
        this.signUpInProcess = true;

        try {
            await this.userService.signUp(this.signUpPayload)
        } catch (error: any) {
            if (isValidationError(error)) {
                setErrorsToFields(error, setFieldError);
                this.logger.error("Sign up new user - validation error");
                return;
            }
            throw error;
        } finally {
            this.signUpInProcess = false;
            this.logger.debug("Sign up new user - finish");
        }
    }
}

export const useSignUpPageStore = (): SignUpPageStore => {
    const [signUpPageStore] = useState(new SignUpPageStore());
    return signUpPageStore;
}
