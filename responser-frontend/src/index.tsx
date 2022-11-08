import React from 'react';
import ReactDOM from "react-dom/client";
import {Router} from "react-router";
import {browserHistory} from "router";
import App from "app/App";
import "styles/common.less"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Router history={browserHistory}>
        <App/>
    </Router>
);
