import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {navigateToMainPage} from "../main-page/MainPage";
import {useLogger} from "../../utils/Logger";

export const LOGIN_EXTENSION: string = "/login-extension";

const LoginExtension: React.FC = () => {
    const extensionService = useExtensionService();
    const logger = useLogger("LoginExtension");

    useEffect(() => {
        extensionService.setToken()
        .then(response => {
            logger.debug("Extension token was set - navigate to main page.");
            navigateToMainPage();
        })
        .catch(reason => {
            logger.debug("Extension token set error - navigate to main page.", reason);
            navigateToMainPage();
        })
    }, []);

    return null;
}

export default observer(LoginExtension);
