import React, {Component} from "react";
import {observer} from "mobx-react";
import {Page} from "app/components/page/Page";
import {navigateTo} from "../../utils/NavigationUtils";
import "./MainPage.less";

export const MAIN_PAGE_URL: string = "/main";

export const navigateToMainPage = () => navigateTo(MAIN_PAGE_URL)

/**
 * Videos page. Uses for viewing videos list.
 */
@observer
export class MainPage extends Component {

    render(): React.ReactNode {
        return (
            <Page className="main-page">
                MAIN PAGE!!!!!
            </Page>
        );
    }
}
