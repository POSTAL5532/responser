import React, {Component} from "react";
import {Page} from "app/components/page/Page";
import {observer} from "mobx-react";
import {SignUpPageStore} from "app/logic/sign-up/SignUpPageStore";
import {navigateTo} from "app/utils/NavigationUtils";
import SignUpForm from "app/logic/sign-up/SignUpForm";
import "app/logic/sign-up/SignUpPage.less";
import {GlobalAppStoreContext} from "app/GlobalAppStore";

export const SIGN_UP_PAGE_URL = "/sign-up";

export const navigateToSignUpPage = () => {
    navigateTo(SIGN_UP_PAGE_URL);
}

/**
 * Sign up page.
 */
@observer
export class SignUpPage extends Component {

    static contextType = GlobalAppStoreContext;
    context!: React.ContextType<typeof GlobalAppStoreContext>

    signUpPageStore: SignUpPageStore = new SignUpPageStore();

    componentDidMount(): void {
        this.context.logoutAndClearCurrentUser();
    }

    onFinish = async () => {
        await this.signUpPageStore.signUp();
    }

    render(): React.ReactNode {
        return (
            <Page tabTitle="SignUp" className="sign-up-page">
                <div className="sign-up-form-panel">
                    <h2 className="sign-up-header">Sign up</h2>
                    <SignUpForm
                        signUpPayload={this.signUpPageStore.signUpPayload}
                        onFinish={this.onFinish}
                        signUpErrors={this.signUpPageStore.signUpErrors}/>
                </div>
            </Page>
        );
    }
}