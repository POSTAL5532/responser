import {makeAutoObservable} from "mobx";
import {useState} from "react";
import {Logger} from "../../utils/Logger";

export class MainPageStore {

    logger: Logger = new Logger("MainPageStore");

    navigation: MainPageNavigation = MainPageNavigation.MY_REVIEWS;

    constructor(initialPageItem: MainPageNavigation = MainPageNavigation.MY_REVIEWS) {
        makeAutoObservable(this);
        this.navigation = initialPageItem;
    }

    public navigateTo = (pageItem: MainPageNavigation) => {
        this.logger.debug("Navigate to:", pageItem)
        this.navigation = pageItem;
    }
}

export const useMainPageStoreNew = (initialPageItem: MainPageNavigation = MainPageNavigation.PROFILE): MainPageStore => {
    const [mainPageStore] = useState(new MainPageStore(initialPageItem));
    return mainPageStore;
}

//TODO: Need refactoring with new React-Router
export enum MainPageNavigation {
    PROFILE = "PROFILE",
    MY_REVIEWS = "MY_REVIEWS",
    SECURITY = "SECURITY",
}
