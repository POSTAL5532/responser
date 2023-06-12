import React, {Component} from "react";
import {observer} from "mobx-react";
import {Page} from "../../components/page/Page";
import {SignUpPageStore} from "./SignUpPageStore";
import SignUpForm from "./form/SignUpForm";
import {GlobalAppStoreContext} from "app/GlobalAppStore";
import "./SignUpPage.less";

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
            <Page tabTitle="SignUp" className="sign-up-page">
                <div className="sign-up-form-panel">
                    <h2 className="sign-up-header">Sign up</h2>
                    <SignUpForm
                        disabled={this.signUpPageStore.signUpInProcess}
                        signUpPayload={this.signUpPageStore.signUpPayload}
                        onFinish={this.onFinish}/>
                </div>
            </Page>
        );
    }
}