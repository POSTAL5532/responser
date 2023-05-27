import {makeAutoObservable} from "mobx";
import {Logger} from "../../utils/Logger";
import {UserService} from "../../service/UserService";
import {User} from "../../model/User";
import {useState} from "react";
import {EmailConfirmationService} from "../../service/EmailConfirmationService";

export class UserProfilePageStore {

    logger: Logger = new Logger("EditUserProfilePageStore");

    userService: UserService = new UserService();

    emailConfirmationService: EmailConfirmationService = new EmailConfirmationService();

    currentUser: User;

    isConfirmationResent: boolean = false;

    loadingState: UserProfilePageStoreLoadingState = new UserProfilePageStoreLoadingState();

    constructor() {
        makeAutoObservable(this);
    }

    public init = async (currentUserId: string) => {
        this.logger.debug("Init store: currentUserId =", currentUserId);
        await this.initCurrentUser();
    }

    public initCurrentUser = async () => {
        this.logger.debug("Init current user data - start.");
        this.loadingState.isDataLoading = true;

        try {
            this.currentUser = await this.userService.getCurrentUser();
            this.logger.debug("Init current user data - finish.");
        } finally {
            this.loadingState.isDataLoading = false;
        }
    }

    public resendConfirmationEmail = async () => {
        this.logger.debug("Resend confirmation email - start.");
        this.loadingState.resendConfirmationProcess = true;

        try {
            await this.emailConfirmationService.resendConfirmationEmail();
            this.isConfirmationResent = true;
            this.logger.debug("Resend confirmation email - finish.");
        } finally {
            this.loadingState.resendConfirmationProcess = false;
        }
    }
}

export const useUserProfilePageStore = (): UserProfilePageStore => {
    const [editUserPageStore] = useState<UserProfilePageStore>(new UserProfilePageStore());
    return editUserPageStore;
}

export class UserProfilePageStoreLoadingState {

    resendConfirmationProcess: boolean = false;

    isDataLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }
}
