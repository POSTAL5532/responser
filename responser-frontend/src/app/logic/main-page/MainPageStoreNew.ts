import {makeAutoObservable} from "mobx";
import {useState} from "react";
import {Logger} from "../../utils/Logger";

export class MainPageStoreNew {

    logger: Logger = new Logger("MainPageStoreNew");

    navigation: MainPageNavigation = MainPageNavigation.MY_REVIEWS;

    constructor() {
        makeAutoObservable(this);
    }

    public navigateTo = (pageItem: MainPageNavigation) => {
        this.logger.debug("Navigate to:", pageItem)
        this.navigation = pageItem;
    }
}

export const useMainPageStoreNew = (): MainPageStoreNew => {
    const [mainPageStore] = useState(new MainPageStoreNew());
    return mainPageStore;
}

//TODO: Need refactoring with new React-Router
export enum MainPageNavigation {
    PROFILE = "profile",
    MY_REVIEWS = "my-reviews",
    SECURITY = "security",
}
