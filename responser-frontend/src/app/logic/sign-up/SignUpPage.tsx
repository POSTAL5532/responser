import React, {Component} from "react";
import {observer} from "mobx-react";
import {Page} from "../../components/page/Page";
import {SignUpPageStore} from "./SignUpPageStore";
import SignUpForm from "./form/SignUpForm";
import {GlobalAppStoreContext} from "app/GlobalAppStore";
import "./SignUpPage.less";
import {ReviewlyLogo} from "../../components/reviewly-logo/ReviewlyLogo";

export const SIGN_UP_PAGE_URL = "/sign-up";

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

    onFinish = async (setFieldError?: (field: string, message: string) => void) => {
        await this.signUpPageStore.signUp(setFieldError);
    }

    render(): React.ReactNode {
        return (
            <Page tabTitle="SignUp" className="sign-up-page" hideHeader={true}>
                <div className="description">
                    <ReviewlyLogo/>
                    <h1 className="description-header">What is Lorem Ipsum</h1>
                    <p className="description-content">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                        since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
                <div className="sign-up-form-panel">
                    <h1 className="sign-up-header">Create new user account</h1>
                    <SignUpForm
                        disabled={this.signUpPageStore.signUpInProcess}
                        signUpPayload={this.signUpPageStore.signUpPayload}
                        onFinish={this.onFinish}/>
                </div>
            </Page>
        );
    }
}