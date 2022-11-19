import React from "react";
import {observer} from "mobx-react";
import {navigateTo} from "../../utils/NavigationUtils";
import {Page} from "../../components/page/Page";
import "./MainPage.less";

export const MAIN_PAGE_URL: string = "/main";

export const navigateToMainPage = () => navigateTo(MAIN_PAGE_URL)

const MainPage:React.FC = () => {
    return (
        <Page className="main-page">
            MAIN PAGE!!!!!
        </Page>
    );
}

export default observer(MainPage)