import React, {Component} from 'react';
import {Redirect, Switch} from "react-router";
import classNames from "classnames";
import {observer} from "mobx-react";
import {ErrorBoundary} from "react-error-boundary";
import {AUTH_CODE_PAGE_URL, AuthCodePage} from "./logic/auth-code-page/AuthCodePage";
import {GlobalAppStore, GlobalAppStoreContext} from "./GlobalAppStore";
import AppHeader from "./logic/app-header/AppHeader";
import {AuthorizedRoute, PermitAllRoute, UnauthorizedRoute} from "./components/CustomRoute";
import SignUpPage, {SIGN_UP_PAGE_URL} from "./logic/sign-up/SignUpPage";
import MainPage, {MAIN_PAGE_URL} from "./logic/main-page/MainPage";
import LoginExtension, {LOGIN_EXTENSION} from "./logic/login-extension/LoginExtension";
import LogoutExtension, {LOGOUT_EXTENSION} from "./logic/logout-extension/LogoutExtension";
import AuthorizationService from "./service/authorization/AuthorizationService";
import {COMPONENTS_PAGE_URL, ComponentsPage} from "./logic/components-page/ComponentsPage";
import ForgotPasswordPage, {FORGOT_PASSWORD_PAGE_URL} from "./logic/forgot-password/ForgotPasswordPage";
import RestorePasswordPage, {RESTORE_PASSWORD_PAGE_URL} from "./logic/restore-password/RestorePasswordPage";
import ErrorPage from "./logic/error-page/ErrorPage";
import {AppFooter} from "./logic/app-footer/AppFooter";
import GlobalNotifications from "./logic/global-notifications/GlobalNotifications";

@observer
export class App extends Component {

    globalAppStore: GlobalAppStore = new GlobalAppStore();

    render(): React.ReactNode {
        return (
            <div className={classNames("page", this.globalAppStore.appPageClassName)}>
                    <GlobalAppStoreContext.Provider value={this.globalAppStore}>
                        <AppHeader/>

                        <ErrorBoundary FallbackComponent={ErrorPage}>
                            <Switch>
                                <UnauthorizedRoute path={SIGN_UP_PAGE_URL} exact component={SignUpPage}/>
                                <UnauthorizedRoute path={AUTH_CODE_PAGE_URL} exact component={AuthCodePage}/>
                                <UnauthorizedRoute path={FORGOT_PASSWORD_PAGE_URL} exact component={ForgotPasswordPage}/>
                                <UnauthorizedRoute path={RESTORE_PASSWORD_PAGE_URL} exact component={RestorePasswordPage}/>

                                <AuthorizedRoute path={MAIN_PAGE_URL} exact component={MainPage}/>
                                <AuthorizedRoute path={LOGIN_EXTENSION} exact component={LoginExtension} redirectLogic={AuthorizationService.requestLoginPage}/>

                                <PermitAllRoute path={LOGOUT_EXTENSION} exact component={LogoutExtension}/>
                                <PermitAllRoute path={COMPONENTS_PAGE_URL} exact component={ComponentsPage}/>

                                <Redirect from="*" to={MAIN_PAGE_URL}/>
                            </Switch>

                            <GlobalNotifications/>
                        </ErrorBoundary>

                        <AppFooter/>
                    </GlobalAppStoreContext.Provider>
            </div>
        );
    }
}

export default App;
