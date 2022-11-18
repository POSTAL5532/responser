import React, {useContext} from "react";
import {observer} from "mobx-react";
import {navigateToMainPage} from "../main-page/MainPage";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";

export const LOGOUT_EXTENSION: string = "/logout-extension";

const LogoutExtension: React.FC = () => {
    const context = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const extensionService = useExtensionService();
    context.logoutAndClearCurrentUser();
    extensionService.removeToken();
    navigateToMainPage();
    return null;
}

export default observer(LogoutExtension);
