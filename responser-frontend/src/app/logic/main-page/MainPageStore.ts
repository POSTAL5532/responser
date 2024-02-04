import {makeAutoObservable} from "mobx";
import {useState} from "react";
import {Logger} from "../../utils/Logger";

export class MainPageStore {

    logger: Logger = new Logger("MainPageStore");

    navigation: MainPageNavigation = MainPageNavigation.MY_REVIEWS;

    constructor() {
        makeAutoObservable(this);
    }

    public navigateTo = (pageItem: MainPageNavigation) => {
        this.logger.debug("Navigate to:", pageItem)
        this.navigation = pageItem;
    }
}

export const useMainPageStoreNew = (): MainPageStore => {
    const [mainPageStore] = useState(new MainPageStore());
    return mainPageStore;
}

//TODO: Need refactoring with new React-Router
export enum MainPageNavigation {
    PROFILE = "profile",
    MY_REVIEWS = "my-reviews",
    SECURITY = "security",
}
