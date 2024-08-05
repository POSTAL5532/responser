import {Logger} from "../utils/Logger";
import {ApiClient} from "./ApiClient";
import {User} from "../model/User";
import {PageableResponse} from "../model/PageableResponse";
import {Pagination} from "../model/Pagination";
import {SetRoleDTO} from "../model/SetRoleDTO";
import {UserCriteria} from "../model/UserCriteria";
import {CreateFakeUserProfile} from "../model/CreateFakeUserProfile";

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

    getUsers = async (userCriteria: UserCriteria, pagination: Pagination): Promise<PageableResponse<User>> => {
        this.logger.debug("Get all users.");
        const response = await this.client.executeGetRequest(
            BASE_USER_REQUEST,
            {params: {...userCriteria, ...pagination}}
        );

        const users = (response.data as any[]).map(response => User.deserialize(response));

        return PageableResponse.deserialize<User>(response, users);
    }

    setRole = async (userId: string, setRoleDTO: SetRoleDTO): Promise<User> => {
        this.logger.debug("Set " + setRoleDTO.roleName + " role for user " + userId);
        const userData = await this.client.executePutRequest(`${BASE_USER_REQUEST}/set-role/${userId}`, setRoleDTO);
        return User.deserialize(userData);
    }

    createFakeUser = async (newFakeUser: CreateFakeUserProfile): Promise<void> => {
        this.logger.debug("Create new fake " + newFakeUser.fullName + " user ");
        await this.client.executePostRequest(`${BASE_USER_REQUEST}/create-fake`, newFakeUser);
    }
}
