import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {nativeNavigateTo, navigateTo} from "../../utils/NavigationUtils";
import {Page} from "../../components/page/Page";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {Button, ButtonSize} from "../../components/button/Button";
import applicationProperties from "../../service/ApplicationProperties";
import {Icon, IconType} from "../../components/icon/Icon";
import {MessageBlock, MessageBlockType} from "../../components/message-block/MessageBlock";
import ReviewsList from "./ReviewsList";
import {useMainPageStore} from "./MainPageStore";
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
    const {checkExtension} = useExtensionService();
    const [extensionChecking, changeExtensionChecking] = useState(true);
    const [extensionExist, changeExtensionExist] = useState(true);

    const {reviews, init, loadNextReviews, hasNextReviews, loadingState} = useMainPageStore();

    const {isReviewsLoading, isNextReviewsLoading} = loadingState;

    useEffect(() => {
        init();
        checkExtension()
        .catch(() => changeExtensionExist(false))
        .finally(() => changeExtensionChecking(false));
    }, []);

    return (
        <Page className="main-page">
            <div className="result">
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
                         disableReactions={true}/>
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