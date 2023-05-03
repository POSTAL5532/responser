import {makeAutoObservable} from "mobx";
import {UserAccountDataPayload} from "app/model/UserAccountDataPayload";
import {UserService} from "app/service/UserService";
import AuthorizationService from "../../service/authorization/AuthorizationService";
import {Logger} from "../../utils/Logger";

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

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * Runs sign up process.
     */
    signUp = (setFieldError?: (field: string, message: string) => void): Promise<void> => {
        return this.userService.signUp(this.signUpPayload)
        .then(AuthorizationService.requestLoginPage)
        .catch(error => {
            this.logger.error(error.data);
            Object.keys(error.data).forEach(key => setFieldError(key, error.data[key]))
        });
    }
}
