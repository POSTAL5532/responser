import React from "react";
import {Redirect, Route, RouteProps} from "react-router";
import {nativeNavigateTo} from "../utils/NavigationUtils";
import ApplicationProperties from "../service/ApplicationProperties";
import LocalTokenStorageService from "../service/authorization/LocalTokenStorageService";
import {MAIN_PAGE_URL} from "../logic/main-page/MainPage";

type CustomRouteComponentProps = {
    redirectLogic?: () => void;
} & RouteProps;

/**
 * Custom route builder. Create a router with condition for render or redirecting.
 */
const CustomRoute = (canActivate?: () => boolean, redirectPath?: string, isNativeRedirect: boolean = false) => {
    return ({component: Component, redirectLogic, ...other}: CustomRouteComponentProps) => {
        return (
            <Route {...other}
                   render={
                       (props) => {
                           if (!canActivate && !redirectPath) {
                               return <Component {...props}/>;
                           }

                           if (!canActivate()) {
                               LocalTokenStorageService.removeAllTokens();

                               if (redirectLogic) {
                                   redirectLogic();
                                   return null;
                               }

                               if (isNativeRedirect) {
                                   nativeNavigateTo(redirectPath);
                                   return null;
                               }

                               return <Redirect to={{pathname: redirectPath, state: {from: props.location}}}/>;
                           }

                           return <Component {...props}/>;
                       }
                   }
            />
        );
    }
};

/**
 * Route for authorized scope only.
 */
export const AuthorizedRoute = CustomRoute(
    () => LocalTokenStorageService.isAccessTokenExist,
    ApplicationProperties.selfHost,
    true
);

/**
 * Route for unauthorized scope only.
 */
export const UnauthorizedRoute = CustomRoute(() => !LocalTokenStorageService.isAccessTokenExist, MAIN_PAGE_URL);

/**
 * Route for unauthorized scope only.
 */
export const PermitAllRoute = CustomRoute();
