import React, {Component} from 'react';
import {Redirect, Switch} from "react-router";
import ReviewsPage, {REVIEWS_PAGE_URL} from "./logic/reviews/ReviewsPage";
import {AuthorizedRoute, PermitAllRoute} from "./components/CustomRoute";
import {GlobalAppStore, GlobalAppStoreContext} from "./GlobalAppStore";
import EditReviewPage, {EDIT_REVIEW_PAGE_URL} from "./logic/edit-review/EditReviewPage";
import ErrorPage from "./logic/error-page/ErrorPage";
import {ErrorBoundary} from "react-error-boundary";
import "app/App.less";
import 'react-loading-skeleton/dist/skeleton.css'


export class App extends Component {

    globalAppStore: GlobalAppStore = new GlobalAppStore();

    render(): React.ReactNode {
        return (
            <div className="app">
                <ErrorBoundary FallbackComponent={ErrorPage}>
                    <GlobalAppStoreContext.Provider value={this.globalAppStore}>
                        <Switch>
                            <PermitAllRoute path={REVIEWS_PAGE_URL} exact component={ReviewsPage}/>
                            <AuthorizedRoute path={EDIT_REVIEW_PAGE_URL} exact component={EditReviewPage}/>
                            <Redirect from="*" to={REVIEWS_PAGE_URL}/>
                        </Switch>
                    </GlobalAppStoreContext.Provider>
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;
