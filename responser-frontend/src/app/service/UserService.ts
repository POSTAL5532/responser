import {ApiClient} from "app/service/ApiClient";
import {UserAccountDataPayload} from "app/model/UserAccountDataPayload";
import {User} from "app/model/User";

const BASE_USER_REQUEST = "/user-service/api/users"

/**
 * User service.
 */
export class UserService {

    client: ApiClient = new ApiClient();

    signUp = async (signUpPayload: UserAccountDataPayload): Promise<void> => {
        await this.client.executePostRequest(`${BASE_USER_REQUEST}/register`, signUpPayload);
    }

    getCurrentUser = async (): Promise<User> => {
        const userData = await this.client.executeGetRequest(`${BASE_USER_REQUEST}/current`);
        return User.deserialize(userData);
    }
}
