import React, {Component} from 'react';
import {Redirect, Switch} from "react-router";
import {observer} from "mobx-react";
import {ErrorBoundary} from "react-error-boundary";
import {AUTH_CODE_PAGE_URL, AuthCodePage} from "./logic/auth-code-page/AuthCodePage";
import {GlobalAppStore, GlobalAppStoreContext} from "./GlobalAppStore";
import {AuthorizedRoute, PermitAllRoute, UnauthorizedRoute} from "./components/CustomRoute";
import ErrorPage from "./logic/error-page/ErrorPage";
import WelcomePage, {WELCOME_PAGE_URL} from "./logic/welcome-page/WelcomePage";
import {Layout, Spin} from "antd";
import ConsoleSider from "./components/console-sider/ConsoleSider";
import {AppHeader} from "./AppHeader";
import UsersContactFormsPage, {USERS_CONTACT_FORMS_URL} from "./logic/user-contact-froms-page/UsersContactFormsPage";
import UsersPage, {USERS_URL} from "./logic/users-page/UsersPage";
import UserDetailsPage from "./logic/user-details-page/UserDetailsPage";
import ReviewsPage, {REVIEWS_PAGE_URL} from "./logic/reviews/reviews-list-page/ReviewsPage";
import CreateFakeReviewPage, {CREATE_FAKE_REVIEW_PAGE_URL} from "./logic/reviews/create-fake-review-page/CreateFakeReviewPage";

@observer
export class App extends Component {

    globalAppStore: GlobalAppStore = new GlobalAppStore();

    render(): React.ReactNode {
        return (
            <GlobalAppStoreContext.Provider value={this.globalAppStore}>

                <ErrorBoundary FallbackComponent={ErrorPage}>
                    <Spin tip="Loading..." spinning={this.globalAppStore.isLoading}>
                        <Layout style={{minHeight: '100vh'}}>
                            <ConsoleSider/>

                            <Layout>
                                <AppHeader/>
                                <Layout.Content style={{padding: 30}}>
                                    <Switch>

                                        <UnauthorizedRoute path={AUTH_CODE_PAGE_URL} exact component={AuthCodePage}/>
                                        <PermitAllRoute path={WELCOME_PAGE_URL} exact component={WelcomePage}/>

                                        <AuthorizedRoute path={USERS_CONTACT_FORMS_URL} exact component={UsersContactFormsPage}/>
                                        <AuthorizedRoute path={USERS_URL} exact component={UsersPage}/>
                                        <AuthorizedRoute path={`${USERS_URL}/:userId`} exact component={UserDetailsPage}/>
                                        <AuthorizedRoute path={REVIEWS_PAGE_URL} exact component={ReviewsPage}/>
                                        <AuthorizedRoute path={CREATE_FAKE_REVIEW_PAGE_URL} exact component={CreateFakeReviewPage}/>

                                        <Redirect from="*" to={WELCOME_PAGE_URL}/>
                                    </Switch>
                                </Layout.Content>
                            </Layout>
                        </Layout>
                    </Spin>

                </ErrorBoundary>

            </GlobalAppStoreContext.Provider>
        );
    }
}

export default App;
