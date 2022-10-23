import {makeAutoObservable} from "mobx";
import {FacebookService} from "app/service/FacebookService";
import {LoadingStore} from "app/utils/LoadingStore";

export class FacebookPageStore {

    facebookService: FacebookService = new FacebookService();

    facebookAuthDialogUrl: string = null;

    currentUserHasFBToken: boolean;

    loadingStore: LoadingStore = new LoadingStore();

    constructor() {
        makeAutoObservable(this);
    }

    loadFacebookAuthDialogUrl = async () => {
        this.facebookAuthDialogUrl = await this.loadingStore.withLoading(this.facebookService.getFacebookAuthDialogUrl);
    }

    checkFacebookToken = async () => {
        this.currentUserHasFBToken = await this.loadingStore.withLoading(this.facebookService.currentUserHasFBToken);
    }
}