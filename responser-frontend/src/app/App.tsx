import React, {Component} from 'react';
import {Redirect, Switch} from "react-router";
import {AuthorizedRoute, PermitAllRoute, UnauthorizedRoute} from "app/components/CustomRoute";
import {MAIN_PAGE_URL, MainPage} from "app/logic/main-page/MainPage";
import {LOGIN_PAGE_URL, LoginPage} from "app/logic/login/LoginPage";
import {AppHeader} from "app/logic/app-header/AppHeader";
import {FacebookPage, FACEBOOK_PAGE_URL} from "app/logic/facebook-page/FacebookPage";
import {AuthTest, TEST_PAGE_URL} from "app/logic/huest/AuthTest";
import {SIGN_UP_PAGE_URL, SignUpPage} from "app/logic/sign-up/SignUpPage";
import {GlobalAppStore, GlobalAppStoreContext} from "app/GlobalAppStore";
import "app/App.less";

export class App extends Component {

    globalAppStore: GlobalAppStore = new GlobalAppStore();

    render(): React.ReactNode {
        return (
            <GlobalAppStoreContext.Provider value={this.globalAppStore}>
                <div className="app">
                    <AppHeader title="responser"/>

                    <Switch>
                        <UnauthorizedRoute path={LOGIN_PAGE_URL} exact component={LoginPage}/>
                        <UnauthorizedRoute path={SIGN_UP_PAGE_URL} exact component={SignUpPage}/>

                        <AuthorizedRoute path={MAIN_PAGE_URL} exact component={MainPage}/>
                        <AuthorizedRoute path={FACEBOOK_PAGE_URL} exact component={FacebookPage}/>

                        <PermitAllRoute path={TEST_PAGE_URL} exact component={AuthTest}/>

                        <Redirect from="*" to={MAIN_PAGE_URL}/>
                    </Switch>
                </div>
            </GlobalAppStoreContext.Provider>
        );
    }
}

export default App;
