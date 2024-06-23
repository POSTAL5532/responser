import React, {useEffect} from "react";
import {useQuery} from "../../../router";
import AuthorizationService from "../../service/authorization/AuthorizationService";
import LocalTokenStorageService from "../../service/authorization/LocalTokenStorageService";
import {nativeNavigateTo, navigateTo, reloadPage} from "../../utils/NavigationUtils";
import {useLogger} from "../../utils/Logger";
import {WaitStubPage} from "../wait-stub-page/WaitStubPage";
import "./AuthCodePage.less";
import {WELCOME_PAGE_URL} from "../welcome-page/WelcomePage";

export const AUTH_CODE_PAGE_URL = "/auth-code";

export const AuthCodePage: React.FC = () => {
    const query = useQuery();
    const authCode = query.get("code");
    const logger = useLogger("AuthCodePage");

    if (!authCode) {
        logger.debug("Auth code query parameter is empty - redirect to unauthorized page.");
        LocalTokenStorageService.removeAllTokens();
        reloadPage();
    }

    useEffect(() => {
        logger.debug("Try to exchange auth code.");
        AuthorizationService.exchangeAuthCode(authCode)
        .then(tokenInfo => {
            LocalTokenStorageService.setToken(tokenInfo);
            nativeNavigateTo(WELCOME_PAGE_URL);
        })
        .catch((error) => {
            logger.debug("Exchange auth code error - clear all tokens and logout.", error);
            LocalTokenStorageService.removeAllTokens();
            reloadPage();
        })
    }, []);

    return <WaitStubPage/>;
}
