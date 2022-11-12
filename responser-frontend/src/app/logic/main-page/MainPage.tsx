import React, {Component} from "react";
import {observer} from "mobx-react";
import {Page} from "app/components/page/Page";
import "app/logic/main-page/MainPage.less";

export const MAIN_PAGE_URL: string = "/main";

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
