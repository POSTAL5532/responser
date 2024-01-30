import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react";
import {nativeNavigateTo, navigateTo} from "../../utils/NavigationUtils";
import Page from "../../components/page/Page";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {Button, ButtonSize} from "../../components/button/Button";
import applicationProperties from "../../service/ApplicationProperties";
import {MessageBlock, MessageBlockType} from "../../components/message-block/MessageBlock";
import {MainPageNavigation, useMainPageStoreNew} from "./MainPageStoreNew";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {MainMenu} from "./main-menu/MainMenu";
import {PageName} from "../../components/page-name/PageName";
import classNames from "classnames";
import {Icon, IconType} from "../../components/icon/Icon";
import "./MainPage.less";
import ReviewsPageItem from "./reviews-page-item/MyReviewsPageItem";

export const MAIN_PAGE_URL: string = "/main";

export const navigateToMainPage = (native: boolean = true) => {
    if (native) {
        nativeNavigateTo(MAIN_PAGE_URL)
    } else {
        navigateTo(MAIN_PAGE_URL)
    }
}

const MainPage: React.FC = () => {
    const {currentUser, refreshCurrentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const {navigation, navigateTo} = useMainPageStoreNew();
    const [menuHidden, setMenuHidden] = useState(true);

    const {checkExtension} = useExtensionService();
    const [extensionChecking, changeExtensionChecking] = useState(true);
    const [extensionExist, changeExtensionExist] = useState(true);

    // const {reviews, init, loadNextReviews, hasNextReviews, loadingState} = useMainPageStore();


    //const {isReviewsLoading, isNextReviewsLoading} = loadingState;

    useEffect(() => {
        //init();
        checkExtension()
        .catch(() => changeExtensionExist(false))
        .finally(() => changeExtensionChecking(false));
    }, []);

    const getCurrentComponent = (): React.ReactNode => {
        if (navigation === MainPageNavigation.MY_REVIEWS) {
            return <ReviewsPageItem/>;
        }
        if (navigation === MainPageNavigation.PROFILE) {
            return <PageName>My profile</PageName>;
        }
        if (navigation === MainPageNavigation.SECURITY) {
            return <PageName>Security settings</PageName>;
        }
    }

    const onNavigate = (menuItem: MainPageNavigation) => {
        setMenuHidden(true);
        navigateTo(menuItem);
    }

    return (
        <Page className="main-page">
            <section className="section">
                <MainMenu user={currentUser} onNavigate={onNavigate} hidden={menuHidden}/>

                {getCurrentComponent()}

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

                <p className="success-text">
                    Well done! Now you can start to discover websites rating or leave your feedback by browser extension.
                </p>
            </div>

            <h2 className="last-reviews-list-header">Last users reviews</h2>

            <ReviewsList reviews={reviews}
                         hasNextReviews={hasNextReviews}
                         loadNextReviews={loadNextReviews}
                         isLoading={isReviewsLoading}
                         isNextReviewsLoading={isNextReviewsLoading}
                         dontUseCurrentUser={true}
                         disableReactions={true}/>*/}
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