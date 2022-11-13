import React, {Component} from 'react';
import {Redirect, Switch} from "react-router";
import WelcomePage, {WELCOME_PAGE_URL} from "./logic/welcome-page/WelcomePage";
import {AUTH_CODE_PAGE_URL, AuthCodePage} from "./logic/auth-code-page/AuthCodePage";
import {GlobalAppStore, GlobalAppStoreContext} from "./GlobalAppStore";
import {AppHeader} from "./logic/app-header/AppHeader";
import {AuthorizedRoute, UnauthorizedRoute} from "./components/CustomRoute";
import {SIGN_UP_PAGE_URL, SignUpPage} from "./logic/sign-up/SignUpPage";
import {MAIN_PAGE_URL, MainPage} from "./logic/main-page/MainPage";
import LoginExtension, {LOGIN_EXTENSION} from "./logic/login-extension/LoginExtension";
import "app/App.less";

export class App extends Component {

    globalAppStore: GlobalAppStore = new GlobalAppStore();

    render(): React.ReactNode {
        return (
            <GlobalAppStoreContext.Provider value={this.globalAppStore}>
                <div className="app">
                    <AppHeader title="responser"/>

                    <Switch>
                        <UnauthorizedRoute path={WELCOME_PAGE_URL} exact component={WelcomePage}/>
                        <UnauthorizedRoute path={SIGN_UP_PAGE_URL} exact component={SignUpPage}/>
                        <UnauthorizedRoute path={AUTH_CODE_PAGE_URL} exact component={AuthCodePage}/>

                        <AuthorizedRoute path={MAIN_PAGE_URL} exact component={MainPage}/>
                        <AuthorizedRoute path={LOGIN_EXTENSION} exact component={LoginExtension}/>

                        <Redirect from="*" to={MAIN_PAGE_URL}/>
                    </Switch>
                </div>
            </GlobalAppStoreContext.Provider>
        );
    }
}

export default App;
