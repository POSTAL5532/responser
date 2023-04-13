import React, {useContext, useEffect} from "react";
import {useQuery} from "../../../router";
import AuthorizationService from "../../service/authorization/AuthorizationService";
import LocalTokenStorageService from "../../service/authorization/LocalTokenStorageService";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {Spinner} from "../../components/spinner/Spinner";
import {navigateToWelcomePage} from "../welcome-page/WelcomePage";
import {navigateToMainPage} from "../main-page/MainPage";
import "./AuthCodePage.less";

export const AUTH_CODE_PAGE_URL = "/auth-code";

export const AuthCodePage: React.FC = () => {
    const query = useQuery();
    const context = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const extensionService = useExtensionService();
    const authCode = query.get("code");

    if (!authCode) {
        navigateToWelcomePage();
    }

    useEffect(() => {
        AuthorizationService.exchangeAuthCode(authCode)
        .then(tokenInfo => {
            LocalTokenStorageService.setToken(tokenInfo);
            extensionService.setToken(tokenInfo)
            .then(() => navigateToMainPage)
            .catch(reason => {
                console.error(reason);
                navigateToWelcomePage()
            })
        })
        .catch(() => {
            context.logoutAndClearCurrentUser();
            navigateToWelcomePage();
        })
    }, []);

    return (
        <div className="auth-code">
            <Spinner/>
            <span>Wait for a moment</span>
        </div>
    );
}
