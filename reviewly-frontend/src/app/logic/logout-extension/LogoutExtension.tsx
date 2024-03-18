import React from "react";
import {observer} from "mobx-react";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {nativeNavigateTo} from "../../utils/NavigationUtils";
import ApplicationProperties from "../../service/ApplicationProperties";
import LocalTokenStorageService from "../../service/authorization/LocalTokenStorageService";
import {useLogger} from "../../utils/Logger";
import {WaitStubPage} from "../wait-stub-page/WaitStubPage";

export const LOGOUT_EXTENSION: string = "/logout-extension";

const LogoutExtension: React.FC = () => {
    const extensionService = useExtensionService();
    const logger = useLogger("LogoutExtension");

    LocalTokenStorageService.removeAllTokens();

    extensionService.removeToken().finally(() => {
        nativeNavigateTo(ApplicationProperties.authLogoutPageUrl);
    });

    return <WaitStubPage/>;
}

export default observer(LogoutExtension);
