import React, {Component} from 'react';
import {Redirect, Switch} from "react-router";
import {AUTH_CODE_PAGE_URL, AuthCodePage} from "./logic/auth-code-page/AuthCodePage";
import {GlobalAppStore, GlobalAppStoreContext} from "./GlobalAppStore";
import AppHeader from "./logic/app-header/AppHeader";
import {AuthorizedRoute, PermitAllRoute, UnauthorizedRoute} from "./components/CustomRoute";
import {SIGN_UP_PAGE_URL, SignUpPage} from "./logic/sign-up/SignUpPage";
import MainPage, {MAIN_PAGE_URL} from "./logic/main-page/MainPage";
import LoginExtension, {LOGIN_EXTENSION} from "./logic/login-extension/LoginExtension";
import LogoutExtension, {LOGOUT_EXTENSION} from "./logic/logout-extension/LogoutExtension";
import EditUserPage, {EDIT_USER_PAGE_URL} from "./logic/edit-user-profile/EditUserProfilePage";
import AuthorizationService from "./service/authorization/AuthorizationService";
import UserProfilePage, {USER_PROFILE_PAGE_URL} from "./logic/user-profile/UserProfilePage";
import {COMPONENTS_PAGE_URL, ComponentsPage} from "./logic/components-page/ComponentsPage";

export class App extends Component {

    globalAppStore: GlobalAppStore = new GlobalAppStore();

    render(): React.ReactNode {
        return (
            <GlobalAppStoreContext.Provider value={this.globalAppStore}>
                <div className="app">
                    <AppHeader title="Reviewly"/>

                    <Switch>
                        <UnauthorizedRoute path={SIGN_UP_PAGE_URL} exact component={SignUpPage}/>
                        <UnauthorizedRoute path={AUTH_CODE_PAGE_URL} exact component={AuthCodePage}/>

                        <AuthorizedRoute path={MAIN_PAGE_URL} exact component={MainPage}/>
                        <AuthorizedRoute path={USER_PROFILE_PAGE_URL} exact component={UserProfilePage}/>
                        <AuthorizedRoute path={EDIT_USER_PAGE_URL} exact component={EditUserPage}/>
                        <AuthorizedRoute path={LOGIN_EXTENSION} exact component={LoginExtension} redirectLogic={AuthorizationService.requestLoginPage}/>

                        <PermitAllRoute path={LOGOUT_EXTENSION} exact component={LogoutExtension}/>
                        <PermitAllRoute path={COMPONENTS_PAGE_URL} exact component={ComponentsPage}/>

                        <Redirect from="*" to={MAIN_PAGE_URL}/>
                    </Switch>
                </div>
            </GlobalAppStoreContext.Provider>
        );
    }
}

export default App;
