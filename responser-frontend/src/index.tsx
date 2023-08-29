import React from 'react';
import ReactDOM from "react-dom/client";
import {Router} from "react-router";
import {browserHistory} from "router";
import App from "app/App";
import "styles/common.less"
import "styles/fonts.less";
import 'react-tooltip/dist/react-tooltip.css'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Router history={browserHistory}>
        <App/>
    </Router>
);
