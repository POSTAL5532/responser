import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {nativeNavigateTo, navigateTo} from "../../utils/NavigationUtils";
import {Page} from "../../components/page/Page";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {Button, ButtonSize} from "../../components/button/Button";
import applicationProperties from "../../service/ApplicationProperties";
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

    useEffect(() => {
        checkExtension()
        .catch(() => changeExtensionExist(false))
        .finally(() => changeExtensionChecking(false));
    });

    return (
        <Page className="main-page">
            {!extensionChecking ? <ExtensionExistCheck exist={extensionExist}/> : null}

            <p className="success-text">
                Well done! Now you can start to discover websites rating or leave your feedback by browser extension.
            </p>
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
        <div className="extension-does-not-exist">
            Looks like you didn't install the browser extension for reviews.
            <Button size={ButtonSize.SMALL} onClick={onInstallExtensionClick}>Install extension</Button>
        </div>
    );
}

export default observer(MainPage)