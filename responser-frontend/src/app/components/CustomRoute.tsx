import React from "react";
import {Redirect, Route, RouteProps} from "react-router";
import {MAIN_PAGE_URL} from "app/logic/main-page/MainPage";
import TokenStore from "app/service/authorization/LocalTokenStorageService";
import {nativeNavigateTo} from "../utils/NavigationUtils";
import ApplicationProperties from "../service/ApplicationProperties";

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
    () => TokenStore.isAccessTokenExist,
    ApplicationProperties.unauthorizedPageUrl,
    true
);

/**
 * Route for unauthorized scope only.
 */
export const UnauthorizedRoute = CustomRoute(() => !TokenStore.isAccessTokenExist, MAIN_PAGE_URL);

/**
 * Route for unauthorized scope only.
 */
export const PermitAllRoute = CustomRoute();
