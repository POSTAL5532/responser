import {ApiClient} from "app/service/ApiClient";
import {UserAccountDataPayload} from "app/model/UserAccountDataPayload";
import {User} from "app/model/User";
import {Logger} from "../utils/Logger";
import {UpdateUserPayload} from "../model/UpdateUserPayload";
import {UpdateUserPasswordPayload} from "../model/UpdateUserPasswordPayload";
import {ForgotPasswordPayload} from "../model/ForgotPasswordPayload";
import {RestorePasswordPayload} from "../model/RestorePasswordPayload";

const BASE_USER_REQUEST = "/users"

/**
 * User service.
 */
export class UserService {

    logger: Logger = new Logger("UserService");

    client: ApiClient = new ApiClient();

    signUp = async (signUpPayload: UserAccountDataPayload): Promise<void> => {
        this.logger.debug("Sign up.");
        await this.client.executePostRequest(`${BASE_USER_REQUEST}`, signUpPayload);
    }

    getCurrentUser = async (): Promise<User> => {
        this.logger.debug("Get current user.");
        const userData = await this.client.executeGetRequest(`${BASE_USER_REQUEST}/current`);
        return User.deserialize(userData);
    }

    updateUser = async (userUpdates: UpdateUserPayload): Promise<void> => {
        this.logger.debug("Update current user:", userUpdates);
        await this.client.executePutRequest(`${BASE_USER_REQUEST}`, userUpdates);
    }

    updatePassword = async (passwordPayload: UpdateUserPasswordPayload): Promise<void> => {
        this.logger.debug("Update current user password:", passwordPayload);
        await this.client.executePutRequest(`${BASE_USER_REQUEST}/update-password`, passwordPayload);
    }

    sendRestorePasswordLink = async (forgotPasswordPayload: ForgotPasswordPayload): Promise<void> => {
        this.logger.debug("Send restoring link for user password.", forgotPasswordPayload);
        await this.client.executePostRequest(`${BASE_USER_REQUEST}/send-restore-password-link`, forgotPasswordPayload)
    }

    restorePassword = async (restorePasswordPayload: RestorePasswordPayload): Promise<void> => {
        this.logger.debug("Restore user password.", restorePasswordPayload);
        await this.client.executePostRequest(`${BASE_USER_REQUEST}/restore-password`, restorePasswordPayload)
    }
}
