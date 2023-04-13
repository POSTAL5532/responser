import React, {useContext} from "react";
import {observer} from "mobx-react";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {nativeNavigateTo} from "../../utils/NavigationUtils";
import ApplicationProperties from "../../service/ApplicationProperties";

export const LOGOUT_EXTENSION: string = "/logout-extension";

const LogoutExtension: React.FC = () => {
    const context = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const extensionService = useExtensionService();

    context.logoutAndClearCurrentUser();

    extensionService.removeToken().finally(() => {
        nativeNavigateTo(ApplicationProperties.authLogoutPageUrl);
    });
    return null;
}

export default observer(LogoutExtension);
