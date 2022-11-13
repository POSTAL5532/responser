import React, {useContext, useEffect} from "react";
import {useQuery} from "../../../router";
import AuthorizationService from "../../service/authorization/AuthorizationService";
import LocalTokenStorageService from "../../service/authorization/LocalTokenStorageService";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {useExtensionService} from "../../service/extension/ExtensionService";

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
                        console.warn(reason);
                    })
                    .finally(() => window.location.reload())
            })
            .catch(() => {
                context.logoutAndClearCurrentUser();
                window.location.reload()
            })
    }, []);

    return (
        <h1>DONE</h1>
    );
}
