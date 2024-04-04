import React from "react";
import {observer} from "mobx-react";
import classNames from "classnames";
import {User} from "../../../model/User";
import UserInfo from "./UserInfo";
import {Button} from "../../../components/button/Button";
import {MainPageNavigation} from "../MainPageStore";
import {useLogger} from "../../../utils/Logger";
import LocalTokenStorageService from "../../../service/authorization/LocalTokenStorageService";
import {nativeNavigateToAuthLogoutPageUrl} from "../../../utils/NavigationUtils";
import {useExtensionService} from "../../../service/extension/ExtensionService";
import {Icon, IconType} from "../../../components/icon/Icon";
import "./MainMenu.less";

type MainMenuProps = {
    user: User;
    onNavigate: (navigateTo: MainPageNavigation) => void;
    hidden: boolean;
    currentNavigation: MainPageNavigation;
    onChangeUserAvatarClick: () => void;
}

const MainMenu: React.FC<MainMenuProps> = (props: MainMenuProps) => {
    const {user, currentNavigation, onChangeUserAvatarClick, onNavigate, hidden} = props;

    const extensionService = useExtensionService();
    const logger = useLogger("MainMenu");

    const onLogOut = () => {
        logger.debug("Logout click")
        LocalTokenStorageService.removeAllTokens()

        extensionService.removeToken()
        .catch(reason => logger.error(reason))
        .finally(() => {
            logger.debug("Redirect to auth server logout page");
            nativeNavigateToAuthLogoutPageUrl();
        });
    }

    const getMenuItemClassName = (navigationItem: MainPageNavigation) => {
        return classNames("menu-item", {"active": navigationItem === currentNavigation});
    }

    return (
        <div className={classNames("main-menu-container", {"hidden": hidden})}>
            <UserInfo user={user} onChangeUserAvatarClick={onChangeUserAvatarClick}/>

            <div className="main-menu">
                <Button className={getMenuItemClassName(MainPageNavigation.MY_REVIEWS)} onClick={() => onNavigate(MainPageNavigation.MY_REVIEWS)}>My
                    reviews</Button>
                <Button className={getMenuItemClassName(MainPageNavigation.PROFILE)} onClick={() => onNavigate(MainPageNavigation.PROFILE)}>My profile</Button>
                <Button className={getMenuItemClassName(MainPageNavigation.SECURITY)} onClick={() => onNavigate(MainPageNavigation.SECURITY)}>Security
                    settings</Button>
            </div>

            <div className="account-control-container">
                <Button onClick={onLogOut}><Icon type={IconType.LOGOUT}/></Button>
                <Button onClick={() => console.log("Remove button click")}><Icon type={IconType.REMOVE}/></Button>
            </div>
        </div>
    );
}

export default observer(MainMenu);
