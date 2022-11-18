import React, {useContext} from "react";
import {observer} from "mobx-react";
import {Button} from "../../components/button/Button";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import "./AppHeader.less";
import {useExtensionService} from "../../service/extension/ExtensionService";

export const AppHeader: React.FC = observer(() => {
    const context = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const extensionService = useExtensionService();

    const onLogOut = async () => {
        extensionService.openLogoutPage();
    }

    const onUserInfoClick = () => {
        console.log("ON USER INFO CLICK")
    }

    const onLoginClick = () => {
        extensionService.openLoginPage();
    }

    return (
        <div className="app-header">
            <div className="header-title">Responser</div>
            {
                context.isAuthorized
                    ? <div className="user-block">
                        <div className="user-info" onClick={onUserInfoClick}>
                        <span className="user-full-name">
                            {context.currentUser.firstName} {context.currentUser.lastName}
                        </span>
                            <span className="user-email">{context.currentUser.email}</span>
                        </div>
                        <Button outlined={true} onClick={onLogOut}>Logout</Button>
                    </div>
                    : <Button outlined={true} onClick={onLoginClick}>Login</Button>
            }
        </div>
    );
});