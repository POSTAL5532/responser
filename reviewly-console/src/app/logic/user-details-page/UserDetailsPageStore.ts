import {Logger} from "../../utils/Logger";
import {useState} from "react";
import {User} from "../../model/User";
import {makeAutoObservable, runInAction} from "mobx";
import {UserService} from "../../service/UserService";
import {SetRoleDTO} from "../../model/SetRoleDTO";
import {RoleName} from "../../model/RoleName";
import {UserCriteria} from "../../model/UserCriteria";
import {Pagination} from "../../model/Pagination";

export class UserDetailsPageStore {

    logger: Logger = new Logger("UsersPageStore");

    isLoading: boolean = false;

    userService: UserService = new UserService();

    user: User = null;

    constructor() {
        makeAutoObservable(this);
    }

    init = async (userId: string) => {
        this.isLoading = true;

        const userCriteria = new UserCriteria();
        userCriteria.id = userId;

        const users = await this.userService.getUsers(userCriteria, Pagination.SINGLE_ELEMENT).finally(
            () => runInAction(() => this.isLoading = false)
        );

        this.user = users.getFirst();
    }

    blockUser = async () => {
        await this.setRole(this.user.id, RoleName.USER_BLOCKED);
    }

    unblockUser = async () => {
        await this.setRole(this.user.id, RoleName.USER);
    }

    private setRole = async (userId: string, roleName: RoleName) => {
        this.isLoading = true;
        const setRoleDTO = new SetRoleDTO();
        setRoleDTO.roleName = roleName;

        this.user = await this.userService.setRole(userId, setRoleDTO).finally(
            () => runInAction(() => this.isLoading = false)
        );
    }
}

export const useUserDetailsPageStore = (): UserDetailsPageStore => {
    const [userDetailsPageStore] = useState(new UserDetailsPageStore());
    return userDetailsPageStore;
}
