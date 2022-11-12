import React from "react";
import {observer} from "mobx-react";
import {Page} from "app/components/page/Page";
import {Button} from "app/components/button/Button";
import AuthorizationService from "../../service/authorization/AuthorizationService";
import "./WelcomePage.less"

export const WELCOME_PAGE_URL: string = "/welcome";

const WelcomePage: React.FC = () => {
    return (
        <Page className="welcome-page">
            <Button onClick={() => AuthorizationService.requestLoginPage()}>AUTH</Button>
        </Page>
    );
}

export default observer(WelcomePage);
