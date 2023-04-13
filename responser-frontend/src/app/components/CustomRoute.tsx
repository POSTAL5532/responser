import {MAIN_PAGE_URL} from "app/logic/main-page/MainPage";
import React from "react";
import {Route, RouteProps} from "react-router";
import TokenStore from "app/service/authorization/LocalTokenStorageService";
import {WELCOME_PAGE_URL} from "../logic/welcome-page/WelcomePage";
import {nativeNavigateTo} from "../utils/NavigationUtils";
import ApplicationProperties from "../service/ApplicationProperties";

/**
 * Custom route builder. Create a router with condition for render or redirecting.
 */
const CustomRoute = (canActivate?: () => boolean, redirect?: string) => {
    return ({component: Component, ...other}: RouteProps) => {
        return (
            <Route {...other}
                   render={
                       (props) => {
                           if (!canActivate && !redirect) {
                               return <Component {...props}/>;
                           }

                           if (!canActivate()) {
                               nativeNavigateTo(ApplicationProperties.unauthorizedPageUrl);
                               return null;
                           }

                           return <Component {...props}/>
                       }
                   }
            />
        );
    }
};

/**
 * Route for authorized scope only.
 */
export const AuthorizedRoute = CustomRoute(() => TokenStore.isAccessTokenExist, WELCOME_PAGE_URL);

/**
 * Route for unauthorized scope only.
 */
export const UnauthorizedRoute = CustomRoute(() => !TokenStore.isAccessTokenExist, MAIN_PAGE_URL);

/**
 * Route for unauthorized scope only.
 */
export const PermitAllRoute = CustomRoute();
