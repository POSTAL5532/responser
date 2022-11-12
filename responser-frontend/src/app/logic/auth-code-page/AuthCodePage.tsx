import React, {useContext, useEffect} from "react";
import {useQuery} from "../../../router";
import AuthorizationService from "../../service/authorization/AuthorizationService";
import LocalTokenStorageService from "../../service/authorization/LocalTokenStorageService";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";

export const AUTH_CODE_PAGE_URL = "/auth-code";

export const AuthCodePage: React.FC = () => {
    const query = useQuery();
    const context = useContext<GlobalAppStore>(GlobalAppStoreContext);

    useEffect(() => {
        AuthorizationService.exchangeAuthCode(query.get("code"))
            .then(tokenInfo => {
                LocalTokenStorageService.setToken(tokenInfo);
            })
            .catch(() => {
                context.logoutAndClearCurrentUser();
            })
            .finally(() => window.location.reload());
    }, []);

    return (
        <h1>DONE</h1>
    );
}
