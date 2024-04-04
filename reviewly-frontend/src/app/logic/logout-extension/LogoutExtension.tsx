import React from "react";
import {observer} from "mobx-react";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {nativeNavigateToAuthLogoutPageUrl} from "../../utils/NavigationUtils";
import LocalTokenStorageService from "../../service/authorization/LocalTokenStorageService";
import {useLogger} from "../../utils/Logger";
import {WaitStubPage} from "../wait-stub-page/WaitStubPage";

export const LOGOUT_EXTENSION: string = "/logout-extension";

const LogoutExtension: React.FC = () => {
    const extensionService = useExtensionService();

    LocalTokenStorageService.removeAllTokens();

    extensionService.removeToken().finally(() => {
        nativeNavigateToAuthLogoutPageUrl();
    });

    return <WaitStubPage/>;
}

export default observer(LogoutExtension);
