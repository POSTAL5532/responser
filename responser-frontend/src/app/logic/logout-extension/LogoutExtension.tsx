import React from "react";
import {observer} from "mobx-react";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {nativeNavigateTo} from "../../utils/NavigationUtils";
import ApplicationProperties from "../../service/ApplicationProperties";
import LocalTokenStorageService from "../../service/authorization/LocalTokenStorageService";

export const LOGOUT_EXTENSION: string = "/logout-extension";

const LogoutExtension: React.FC = () => {
    const extensionService = useExtensionService();

    LocalTokenStorageService.removeAllTokens();

    extensionService.removeToken().finally(() => {
        nativeNavigateTo(ApplicationProperties.authLogoutPageUrl);
    });

    return null;
}

export default observer(LogoutExtension);
