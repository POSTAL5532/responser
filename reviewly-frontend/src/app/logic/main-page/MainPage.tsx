import React, {useContext, useState} from "react";
import {observer} from "mobx-react";
import classNames from "classnames";
import {nativeNavigateTo, navigateTo} from "../../utils/NavigationUtils";
import Page from "../../components/page/Page";
import {Button} from "../../components/button/Button";
import {MainPageNavigation, useMainPageStoreNew} from "./MainPageStore";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import MainMenu from "./main-menu/MainMenu";
import {Icon, IconType} from "../../components/icon/Icon";
import ReviewsPageItem from "./reviews-page-item/MyReviewsPageItem";
import MyProfilePageItem from "./profile-page-item/MyProfilePageItem";
import SecurityPageItem from "./security-page-item/SecurityPageItem";
import {useQuery} from "../../../router";
import EditUserAvatar from "./edit-user-avatar/EditUserAvatar";
import "./MainPage.less";

export const MAIN_PAGE_URL: string = "/main";

export const navigateToMainPage = (native: boolean = true) => {
    if (native) {
        nativeNavigateTo(MAIN_PAGE_URL)
    } else {
        navigateTo(MAIN_PAGE_URL)
    }
}

const MainPage: React.FC = () => {
    const query = useQuery();
    const pageItem: MainPageNavigation = MainPageNavigation[query.get("item") as keyof typeof MainPageNavigation];

    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const {navigation, navigateTo} = useMainPageStoreNew(pageItem);
    const [menuHidden, setMenuHidden] = useState(true);
    const [editUserAvatar, setEditUserAvatar] = useState(false);

    const onNavigate = (menuItem: MainPageNavigation) => {
        setMenuHidden(true);
        navigateTo(menuItem);
    }

    return (
        <Page className="main-page">
            <section className="section">
                <MainMenu
                    user={currentUser}
                    currentNavigation={navigation}
                    onNavigate={onNavigate}
                    onChangeUserAvatarClick={() => setEditUserAvatar(true)}
                    hidden={menuHidden}/>

                {navigation === MainPageNavigation.MY_REVIEWS && <ReviewsPageItem hidden={!menuHidden}/>}
                {navigation === MainPageNavigation.PROFILE && <MyProfilePageItem hidden={!menuHidden}/>}
                {navigation === MainPageNavigation.SECURITY && <SecurityPageItem hidden={!menuHidden}/>}

                <EditUserAvatar show={editUserAvatar} onClose={() => setEditUserAvatar(false)}/>

                <Button className={classNames("menu-control show-menu", {"hidden": !menuHidden})} onClick={() => setMenuHidden(false)}>
                    <Icon type={IconType.SANDWICH}/>
                </Button>
                <Button className={classNames("menu-control hide-menu", {"hidden": menuHidden})} onClick={() => setMenuHidden(true)}>
                    <Icon type={IconType.CLOSE}/>
                </Button>
            </section>
        </Page>
    );
}

export default observer(MainPage)