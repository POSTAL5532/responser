import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {navigateToMainPage} from "../main-page/MainPage";

export const LOGIN_EXTENSION: string = "/login-extension";

const LoginExtension: React.FC = () => {
    const extensionService = useExtensionService();

    useEffect(() => {
        extensionService.setToken()
            .then(response => {
                console.debug(response);
                navigateToMainPage();
            })
            .catch(reason => {
                console.warn(reason);
                navigateToMainPage();
            })
    }, []);

    return null;
}

export default observer(LoginExtension);
