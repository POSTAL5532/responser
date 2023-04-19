import React, {useContext} from "react";
import {observer} from "mobx-react";
import {Button} from "app/components/button/Button";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {nativeNavigateTo} from "../../utils/NavigationUtils";
import ApplicationProperties from "../../service/ApplicationProperties";
import LocalTokenStorageService from "../../service/authorization/LocalTokenStorageService";
import {Icon, IconType} from "../../components/icon/Icon";
import "./AppHeader.less";

type PageHeaderProps = {
    title: string;
}

const AppHeader: React.FC<PageHeaderProps> = (props: PageHeaderProps) => {
    const context = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const extensionService = useExtensionService();

    const onLogOut = () => {
        LocalTokenStorageService.removeAllTokens()
        extensionService.removeToken().finally(() => {
            nativeNavigateTo(ApplicationProperties.authLogoutPageUrl);
        });
    }

    const onUserInfoClick = () => {
        console.log("ON USER INFO CLICK")
    }

    return (
        <div className="app-header">
            <div className="header-title">{props.title}</div>
            {
                context.currentUser &&
                <div className="user-block">
                    <div className="user-info" onClick={onUserInfoClick}>
                        <span className="user-full-name">{context.currentUser.fullName}</span>
                    </div>
                    <Button onClick={onLogOut}>Logout <Icon type={IconType.LOGOUT}/></Button>
                </div>
            }
        </div>
    );
}

export default observer(AppHeader);
