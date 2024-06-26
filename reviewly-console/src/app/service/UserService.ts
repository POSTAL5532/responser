import {Logger} from "../utils/Logger";
import {ApiClient} from "./ApiClient";
import {User} from "../model/User";
import {PageableResponse} from "../model/PageableResponse";
import {Pagination} from "../model/Pagination";
import {SetRoleDTO} from "../model/SetRoleDTO";

const BASE_USER_REQUEST = "/users"

/**
 * User service.
 */
export class UserService {

    logger: Logger = new Logger("UserService");

    client: ApiClient = new ApiClient();

    getUser = async (userId: string): Promise<User> => {
        this.logger.debug("Get user " + userId);
        const userData = await this.client.executeGetRequest(`${BASE_USER_REQUEST}/${userId}`);
        return User.deserialize(userData);
    }

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

    setRole = async (userId: string, setRoleDTO: SetRoleDTO): Promise<User> => {
        this.logger.debug("Set " + setRoleDTO.roleName + " role for user " + userId);
        const userData = await this.client.executePutRequest(`${BASE_USER_REQUEST}/set-role/${userId}`, setRoleDTO);
        return User.deserialize(userData);
    }
}
