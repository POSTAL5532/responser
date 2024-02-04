import React from "react";
import {User} from "../../../model/User";
import {UserInfo} from "./UserInfo";
import {Button} from "../../../components/button/Button";
import {MainPageNavigation} from "../MainPageStore";
import ApplicationProperties from "../../../service/ApplicationProperties";
import {useLogger} from "../../../utils/Logger";
import LocalTokenStorageService from "../../../service/authorization/LocalTokenStorageService";
import {nativeNavigateTo} from "../../../utils/NavigationUtils";
import {useExtensionService} from "../../../service/extension/ExtensionService";
import {Icon, IconType} from "../../../components/icon/Icon";
import classNames from "classnames";
import "./MainMenu.less";

type MainMenuProps = {
    user: User;
    onNavigate: (navigateTo: MainPageNavigation) => void;
    hidden: boolean;
}

export const MainMenu: React.FC<MainMenuProps> = (props: MainMenuProps) => {
    const {user, onNavigate, hidden} = props;

    const extensionService = useExtensionService();
    const logger = useLogger("MainMenu");

    const onLogOut = () => {
        logger.debug("Logout click")
        LocalTokenStorageService.removeAllTokens()

        extensionService.removeToken()
        .catch(reason => logger.error(reason))
        .finally(() => {
            logger.debug("Redirect to auth server logout page");
            nativeNavigateTo(ApplicationProperties.authLogoutPageUrl);
        });
    }

    return (
        <div className={classNames("main-menu-container", {"hidden": hidden})}>
            <UserInfo user={user}/>

            <div className="main-menu">
                <Button className="menu-item" onClick={() => onNavigate(MainPageNavigation.MY_REVIEWS)}>My reviews</Button>
                <Button className="menu-item" onClick={() => onNavigate(MainPageNavigation.PROFILE)}>My profile</Button>
                <Button className="menu-item" onClick={() => onNavigate(MainPageNavigation.SECURITY)}>Security settings</Button>
            </div>

            <div className="account-control-container">
                <Button onClick={onLogOut}><Icon type={IconType.LOGOUT}/></Button>
                <Button onClick={() => console.log("Remove button click")}><Icon type={IconType.REMOVE}/></Button>
            </div>
        </div>
    );
}


