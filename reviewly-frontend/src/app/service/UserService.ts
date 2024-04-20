import {Logger} from "../utils/Logger";
import {UpdateUserPayload} from "../model/UpdateUserPayload";
import {UpdateUserPasswordPayload} from "../model/UpdateUserPasswordPayload";
import {ForgotPasswordPayload} from "../model/ForgotPasswordPayload";
import {RestorePasswordPayload} from "../model/RestorePasswordPayload";
import {ApiClient} from "./ApiClient";
import {UserAccountDataPayload} from "../model/UserAccountDataPayload";
import {User} from "../model/User";

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

    changeAvatar = async (blob: Blob): Promise<string> => {
        const formData = new FormData();
        formData.append("avatar", blob);

        this.logger.debug("Change user avatar.");
        return await this.client.executePostRequest(`${BASE_USER_REQUEST}/change-avatar`, formData)
    }

    removeAvatar = async (): Promise<void> => {
        this.logger.debug("Remove user avatar.");
        await this.client.executeDeleteRequest(`${BASE_USER_REQUEST}/remove-avatar`)
    }
}
