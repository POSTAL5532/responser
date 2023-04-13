import React from "react";
import {observer} from "mobx-react";
import {Page} from "app/components/page/Page";
import {Button} from "app/components/button/Button";
import AuthorizationService from "../../service/authorization/AuthorizationService";
import "./WelcomePage.less"
import {nativeNavigateTo, navigateTo} from "../../utils/NavigationUtils";

export const WELCOME_PAGE_URL: string = "/index";

export const navigateToWelcomePage = (native: boolean = true) => {
    if (native) {
        nativeNavigateTo(WELCOME_PAGE_URL);
    } else {
        navigateTo(WELCOME_PAGE_URL);
    }
}

const WelcomePage: React.FC = () => {
    return (
        <Page className="welcome-page">
            <Button onClick={() => AuthorizationService.requestLoginPage()}>AUTH</Button>
        </Page>
    );
}

export default observer(WelcomePage);
