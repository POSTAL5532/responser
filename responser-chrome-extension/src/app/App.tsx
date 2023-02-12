import React, {Component} from 'react';
import {Redirect, Switch} from "react-router";
import ReviewsPage, {REVIEWS_PAGE_URL} from "./logic/reviews/ReviewsPage";
import {AuthorizedRoute, PermitAllRoute} from "./components/CustomRoute";
import {GlobalAppStore, GlobalAppStoreContext} from "./GlobalAppStore";
import EditReviewPage, {EDIT_REVIEW_PAGE_URL} from "./logic/edit-review/EditReviewPage";
import 'react-loading-skeleton/dist/skeleton.css'
import "app/App.less";


export class App extends Component {

    globalAppStore: GlobalAppStore = new GlobalAppStore();

    render(): React.ReactNode {
        return (
            <GlobalAppStoreContext.Provider value={this.globalAppStore}>
                <div className="app">
                    <Switch>
                        <PermitAllRoute path={REVIEWS_PAGE_URL} exact component={ReviewsPage}/>
                        <AuthorizedRoute path={EDIT_REVIEW_PAGE_URL} exact component={EditReviewPage}/>
                        <Redirect from="*" to={REVIEWS_PAGE_URL}/>
                    </Switch>
                </div>
            </GlobalAppStoreContext.Provider>
        );
    }
}

export default App;
