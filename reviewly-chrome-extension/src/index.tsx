import React from 'react';
import ReactDOM from "react-dom/client";
import {Router} from "react-router";
import {appRouteHistory} from "router";
import App from "./app/App";
import "styles/fonts.less";
import "styles/common.less";
import "nouislider/distribute/nouislider.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    //@ts-ignore
    <Router history={appRouteHistory}>
        <App/>
    </Router>
);
