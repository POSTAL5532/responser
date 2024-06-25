import {Logger} from "../utils/Logger";
import {ApiClient} from "./ApiClient";
import {User} from "../model/User";
import {PageableResponse} from "../model/PageableResponse";
import {Pagination} from "../model/Pagination";

const BASE_USER_REQUEST = "/users"

/**
 * User service.
 */
export class UserService {

    logger: Logger = new Logger("UserService");

    client: ApiClient = new ApiClient();

    getCurrentUser = async (): Promise<User> => {
        this.logger.debug("Get current user.");
        const userData = await this.client.executeGetRequest(`${BASE_USER_REQUEST}/current`);
        return User.deserialize(userData);
    }

    getAllUsers = async (pagination: Pagination): Promise<PageableResponse<User>> => {
        this.logger.debug("Get all users.");
        const response = await this.client.executeGetRequest(BASE_USER_REQUEST, {params: {...pagination}})
        const users = (response.data as any[]).map(response => User.deserialize(response));
        return PageableResponse.deserialize<User>(response, users);
    }
}
