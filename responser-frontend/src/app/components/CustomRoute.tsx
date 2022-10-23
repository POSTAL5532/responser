import {MAIN_PAGE_URL} from "app/logic/main-page/MainPage";
import React from "react";
import {Redirect, Route, RouteProps} from "react-router";
import TokenStore from "app/service/authorization/LocalTokenStorageService";
import {LOGIN_PAGE_URL} from "app/logic/login/LoginPage";

/**
 * Custom route builder. Create a router with condition for render or redirecting.
 */
const CustomRoute = (canActivate: () => boolean, redirect: string) => {
    return ({component: Component, ...other}: RouteProps) => {
        return (
            <Route {...other}
                render={
                    (props) => {
                        return canActivate()
                            ? <Component {...props}/>
                            : <Redirect to={{pathname: redirect, state: {from: props.location}}}/>
                    }
                }
            />
        );
    }
};

/**
 * Route for authorized scope only.
 */
export const AuthorizedRoute = CustomRoute(() => TokenStore.isAccessTokenExist, LOGIN_PAGE_URL);

/**
 * Route for unauthorized scope only.
 */
export const UnauthorizedRoute = CustomRoute(() => !TokenStore.isAccessTokenExist, MAIN_PAGE_URL);
