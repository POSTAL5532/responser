import {ApiClient} from "app/service/ApiClient";
import {UserAccountDataPayload} from "app/model/UserAccountDataPayload";
import {User} from "app/model/User";
import {Logger} from "../utils/Logger";

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
}
