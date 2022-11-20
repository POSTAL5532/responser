import {ApiClient} from "app/service/ApiClient";
import {User} from "app/model/User";

const BASE_USER_REQUEST = "/users"

/**
 * User service.
 */
export class UserService {

    client: ApiClient = new ApiClient();

    getCurrentUser = async (): Promise<User> => {
        const userData = await this.client.executeGetRequest(`${BASE_USER_REQUEST}/current`);
        return User.deserialize(userData);
    }
}
