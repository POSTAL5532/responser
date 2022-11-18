import React, {Component} from 'react';
import {Redirect, Switch} from "react-router";
import ResponsesPage, {RESPONSES_PAGE_URL} from "./logic/responses/ResponsesPage";
import {PermitAllRoute} from "./components/CustomRoute";
import {GlobalAppStore, GlobalAppStoreContext} from "./GlobalAppStore";
import {AppHeader} from "./logic/app-header/AppHeader";
import "app/App.less";


export class App extends Component {

    globalAppStore: GlobalAppStore = new GlobalAppStore();

    componentDidMount() {
        console.log(Date.now().toString())
    }

    render(): React.ReactNode {
        return (
            <GlobalAppStoreContext.Provider value={this.globalAppStore}>
                <div className="app">
                    <AppHeader/>

                    <Switch>
                        <PermitAllRoute path={RESPONSES_PAGE_URL} exact component={ResponsesPage}/>

                        <Redirect from="*" to={RESPONSES_PAGE_URL}/>
                    </Switch>
                </div>
            </GlobalAppStoreContext.Provider>
        );
    }
}

export default App;
