import React, {useEffect} from "react";
import {useQuery} from "../../../router";
import AuthorizationService from "../../service/authorization/AuthorizationService";
import LocalTokenStorageService from "../../service/authorization/LocalTokenStorageService";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {navigateToMainPage} from "../main-page/MainPage";
import {nativeNavigateToAuthLogoutPageUrl} from "../../utils/NavigationUtils";
import {useLogger} from "../../utils/Logger";
import {WaitStubPage} from "../wait-stub-page/WaitStubPage";
import "./AuthCodePage.less";

export const AUTH_CODE_PAGE_URL = "/auth-code";

export const AuthCodePage: React.FC = () => {
    const query = useQuery();
    const extensionService = useExtensionService();
    const authCode = query.get("code");
    const logger = useLogger("AuthCodePage");

    if (!authCode) {
        logger.debug("Auth code query parameter is empty - redirect to unauthorized page.");
        LocalTokenStorageService.removeAllTokens();
        nativeNavigateToAuthLogoutPageUrl();
    }

    useEffect(() => {
        logger.debug("Try to exchange auth code.");
        AuthorizationService.exchangeAuthCode(authCode)
        .then(tokenInfo => {
            LocalTokenStorageService.setToken(tokenInfo);
            extensionService.setToken(tokenInfo).finally(navigateToMainPage)
        })
        .catch((error) => {
            logger.debug("Exchange auth code error - clear all tokens and logout.", error);
            LocalTokenStorageService.removeAllTokens();
            nativeNavigateToAuthLogoutPageUrl();
        })
    }, []);

    return <WaitStubPage/>;
}
