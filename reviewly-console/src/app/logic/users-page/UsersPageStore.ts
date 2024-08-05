import {makeAutoObservable, runInAction} from "mobx";
import {useState} from "react";
import {Pagination} from "../../model/Pagination";
import {Logger} from "../../utils/Logger";
import {User} from "../../model/User";
import {UserService} from "../../service/UserService";
import {UserCriteria} from "../../model/UserCriteria";

export class UsersPageStore {

    public static readonly PAGE_ELEMENTS_COUNT = 10;

    logger: Logger = new Logger("UsersPageStore");

    userService: UserService = new UserService();

    users: User[] = [];

    isLoading: boolean = false;

    currentPageNumber: number;

    totalUsersCount: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    init = async () => {
        this.currentPageNumber = 0;
        const pagination = new Pagination(this.currentPageNumber, UsersPageStore.PAGE_ELEMENTS_COUNT);

        this.isLoading = true;
        const usersResponse = await this.userService.getUsers(new UserCriteria(), pagination).finally(
            () => runInAction(() => this.isLoading = false)
        );

        this.users = usersResponse.data;
        this.totalUsersCount = usersResponse.totalElements;
    }

    loadUsers = async (page: number) => {
        if (this.isLoading) return;

        this.logger.debug("Load users with page: " + page);

        const pagination = new Pagination(page, UsersPageStore.PAGE_ELEMENTS_COUNT);

        this.isLoading = true;
        const usersResponse = await this.userService.getUsers(new UserCriteria(), pagination).finally(
            () => runInAction(() => this.isLoading = false)
        );

        this.users = usersResponse.data;
        this.totalUsersCount = usersResponse.totalElements;
    }
}

export const useUsersPageStore = (): UsersPageStore => {
    const [usersPageStoreStore] = useState(new UsersPageStore());
    return usersPageStoreStore;
}
