import React, {Component} from 'react';
import {Redirect, Switch} from "react-router";
import ResponsesPage, {REVIEWS_PAGE_URL} from "./logic/reviews/ReviewsPage";
import {AuthorizedRoute, PermitAllRoute} from "./components/CustomRoute";
import {GlobalAppStore, GlobalAppStoreContext} from "./GlobalAppStore";
import {AppHeader} from "./logic/app-header/AppHeader";
import {EDIT_REVIEW_PAGE_URL, editReviewPageRender} from "./logic/edit-review/EditReviewPage";
import "app/App.less";


export class App extends Component {

    globalAppStore: GlobalAppStore = new GlobalAppStore();

    render(): React.ReactNode {
        return (
            <GlobalAppStoreContext.Provider value={this.globalAppStore}>
                <div className="app">
                    <AppHeader/>

                    <Switch>
                        <PermitAllRoute path={REVIEWS_PAGE_URL} exact component={ResponsesPage}/>
                        <AuthorizedRoute path={EDIT_REVIEW_PAGE_URL} exact component={editReviewPageRender}/>
                        <Redirect from="*" to={REVIEWS_PAGE_URL}/>
                    </Switch>
                </div>
            </GlobalAppStoreContext.Provider>
        );
    }
}

export default App;
