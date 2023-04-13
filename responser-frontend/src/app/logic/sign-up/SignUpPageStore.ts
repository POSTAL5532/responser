import {makeAutoObservable} from "mobx";
import {UserAccountDataPayload} from "app/model/UserAccountDataPayload";
import {UserService} from "app/service/UserService";
import {navigateToWelcomePage} from "../welcome-page/WelcomePage";

/**
 * Sign up page store.
 */
export class SignUpPageStore {

    /**
     * Sign up request data model.
     */
    signUpPayload: UserAccountDataPayload = new UserAccountDataPayload();

    userService: UserService = new UserService();

    signUpErrors: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * Runs sign up process.
     */
    signUp = (): Promise<void> => {
        return this.userService.signUp(this.signUpPayload)
        .then(() => {
            navigateToWelcomePage();
        })
        .catch(error => {
            this.signUpErrors = error.response.data.errors.map((e: any) => e.defaultMessage)
        });
    }
}
