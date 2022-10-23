import React, {Component} from "react";
import {observer} from "mobx-react";
import {Page} from "app/components/page/Page";
import {LoginPageStore} from "app/logic/login/LoginPageStore";
import {navigateTo} from "app/utils/NavigationUtils";
import LoginForm from "app/logic/login/LoginForm";
import "app/logic/login/LoginPage.less";
import {GlobalAppStoreContext} from "app/GlobalAppStore";

export const LOGIN_PAGE_URL = "/login";

export const navigateToLoginPage = () => {
    navigateTo(LOGIN_PAGE_URL);
}

/**
 * Login page.
 */
@observer
export class LoginPage extends Component {

    static contextType = GlobalAppStoreContext;
    context!: React.ContextType<typeof GlobalAppStoreContext>

    loginPageStore: LoginPageStore = new LoginPageStore();

    componentDidMount(): void {
        this.context.logoutAndClearCurrentUser();
    }

    onFinish = async () => {
        await this.loginPageStore.login();
    }

    render(): React.ReactNode {
        return (
            <Page tabTitle="Login" className="auth-page">
                <div className="login-form-panel">
                    <h2 className="login-header">Sign in</h2>
                    <LoginForm
                        loginPayload={this.loginPageStore.loginPayload}
                        onFinish={this.onFinish}
                        credentialsError={this.loginPageStore.badCredentials ? "Email/Username or password incorrect" : null}/>
                </div>
            </Page>
        );
    }
}
