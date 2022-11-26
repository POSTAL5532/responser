import React, {useContext, useEffect} from "react";
import {useQuery} from "../../../router";
import AuthorizationService from "../../service/authorization/AuthorizationService";
import LocalTokenStorageService from "../../service/authorization/LocalTokenStorageService";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {reloadPage} from "../../utils/NavigationUtils";

export const AUTH_CODE_PAGE_URL = "/auth-code";

export const AuthCodePage: React.FC = () => {
    const query = useQuery();
    const context = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const extensionService = useExtensionService();

    useEffect(() => {
        AuthorizationService.exchangeAuthCode(query.get("code"))
            .then(tokenInfo => {
                LocalTokenStorageService.setToken(tokenInfo);
                extensionService.setToken(tokenInfo)
                    .catch(reason => {
                        console.error(reason);
                    })
                    .finally(() => reloadPage())
            })
            .catch(() => {
                context.logoutAndClearCurrentUser();
                reloadPage();
            })
    }, []);

    return (
        <h1>DONE</h1>
    );
}
