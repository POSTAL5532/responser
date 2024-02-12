import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react";
import classNames from "classnames";
import {nativeNavigateTo, navigateTo} from "../../utils/NavigationUtils";
import Page from "../../components/page/Page";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {Button, ButtonSize} from "../../components/button/Button";
import applicationProperties from "../../service/ApplicationProperties";
import {MessageBlock, MessageBlockType} from "../../components/message-block/MessageBlock";
import {MainPageNavigation, useMainPageStoreNew} from "./MainPageStore";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {MainMenu} from "./main-menu/MainMenu";
import {Icon, IconType} from "../../components/icon/Icon";
import ReviewsPageItem from "./reviews-page-item/MyReviewsPageItem";
import MyProfilePageItem from "./profile-page-item/MyProfilePageItem";
import SecurityPageItem from "./security-page-item/SecurityPageItem";
import {useQuery} from "../../../router";
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

    const {currentUser, refreshCurrentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const {navigation, navigateTo} = useMainPageStoreNew(pageItem);
    const [menuHidden, setMenuHidden] = useState(true);

    const {checkExtension} = useExtensionService();
    const [extensionChecking, changeExtensionChecking] = useState(true);
    const [extensionExist, changeExtensionExist] = useState(true);

    useEffect(() => {
        checkExtension()
        .catch(() => changeExtensionExist(false))
        .finally(() => changeExtensionChecking(false));
    }, []);

    const onNavigate = (menuItem: MainPageNavigation) => {
        setMenuHidden(true);
        navigateTo(menuItem);
    }

    return (
        <Page className="main-page">
            <section className="section">
                <MainMenu user={currentUser} currentNavigation={navigation} onNavigate={onNavigate} hidden={menuHidden}/>

                {navigation === MainPageNavigation.MY_REVIEWS && <ReviewsPageItem hidden={!menuHidden}/>}
                {navigation === MainPageNavigation.PROFILE && <MyProfilePageItem hidden={!menuHidden}/>}
                {navigation === MainPageNavigation.SECURITY && <SecurityPageItem hidden={!menuHidden}/>}

                <Button className={classNames("menu-control show-menu", {"hidden": !menuHidden})} onClick={() => setMenuHidden(false)}>
                    <Icon type={IconType.SANDWICH}/>
                </Button>
                <Button className={classNames("menu-control hide-menu", {"hidden": menuHidden})} onClick={() => setMenuHidden(true)}>
                    <Icon type={IconType.CLOSE}/>
                </Button>
            </section>


            {/*<div className="result">
                <Icon type={IconType.CIRCLE_CHECK}/>

                {!extensionChecking ? <ExtensionExistCheck exist={extensionExist}/> : null}

            </div>*/}
        </Page>
    );
}

type ExtensionExistCheckProps = {
    exist: boolean
}

const ExtensionExistCheck: React.FC<ExtensionExistCheckProps> = ({exist}) => {
    if (exist) {
        return null;
    }

    const onInstallExtensionClick = () => {
        window.open(applicationProperties.downloadExtensionChrome, "_blank");
    }

    return (
        <MessageBlock type={MessageBlockType.WARNING} className="extension-does-not-exist">
            Looks like you didn't install the browser extension for reviews.
            <Button size={ButtonSize.SMALL} onClick={onInstallExtensionClick}>Install extension</Button>
        </MessageBlock>
    );
}

export default observer(MainPage)