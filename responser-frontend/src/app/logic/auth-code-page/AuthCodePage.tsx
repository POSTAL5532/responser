import React, {useEffect} from "react";
import {useQuery} from "../../../router";
import AuthorizationService from "../../service/authorization/AuthorizationService";
import LocalTokenStorageService from "../../service/authorization/LocalTokenStorageService";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {Spinner} from "../../components/spinner/Spinner";
import {navigateToMainPage} from "../main-page/MainPage";
import {nativeNavigateToUnauthorizedPage} from "../../utils/NavigationUtils";
import "./AuthCodePage.less";

export const AUTH_CODE_PAGE_URL = "/auth-code";

export const AuthCodePage: React.FC = () => {
    const query = useQuery();
    const extensionService = useExtensionService();
    const authCode = query.get("code");

    if (!authCode) {
        nativeNavigateToUnauthorizedPage();
    }

    useEffect(() => {
        AuthorizationService.exchangeAuthCode(authCode)
        .then(tokenInfo => {
            LocalTokenStorageService.setToken(tokenInfo);
            extensionService.setToken(tokenInfo)
            .finally(navigateToMainPage)
        })
        .catch(() => {
            LocalTokenStorageService.removeAllTokens();
            nativeNavigateToUnauthorizedPage();
        })
    }, []);

    return (
        <div className="auth-code">
            <Spinner/>
            <span>Wait for a moment</span>
        </div>
    );
}
