import React, {Component, useEffect} from "react";
import {observer} from "mobx-react";
import {Page} from "app/components/page/Page";
import {Button} from "app/components/button/Button";
import {navigateTo} from "app/utils/NavigationUtils";
import {MAIN_PAGE_URL} from "app/logic/main-page/MainPage";
import {FacebookService} from "app/service/FacebookService";
import "app/logic/facebook-page/FacebookPage.less";
import {FacebookPageStore} from "app/logic/facebook-page/FacebookPageStore";
import {ConditionShow} from "app/components/ConditionShow";

export const FACEBOOK_PAGE_URL: string = "/facebook";

/**
 * Facebook page.
 */
@observer
export class FacebookPage extends Component {

    facebookPageStore = new FacebookPageStore();

    componentDidMount() {
        this.facebookPageStore.checkFacebookToken();
    }

    goToFacebookAuthDialog = async () => {
        await this.facebookPageStore.loadFacebookAuthDialogUrl();
    }

    render() {
        const {facebookAuthDialogUrl, currentUserHasFBToken, loadingStore: {isLoading}} = this.facebookPageStore;

        return (
            <Page tabTitle="Facebook" className="facebook-page" loading={isLoading}>
                <Button onClick={() => navigateTo(MAIN_PAGE_URL)}>Main page</Button>

                <ConditionShow condition={!currentUserHasFBToken && !isLoading}>
                    <Button onClick={this.goToFacebookAuthDialog}>Dialog</Button>
                </ConditionShow>

                <ConditionShow condition={facebookAuthDialogUrl && !isLoading}>
                    <a href={facebookAuthDialogUrl}>Login to FB</a>
                </ConditionShow>
            </Page>
        );
    }

}
