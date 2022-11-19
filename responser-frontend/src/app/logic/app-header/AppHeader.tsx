import React, {useContext} from "react";
import {observer} from "mobx-react";
import {Button} from "app/components/button/Button";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import "./AppHeader.less";
import {reloadPage} from "../../utils/NavigationUtils";

type PageHeaderProps = {
    title: string;
}

const AppHeader: React.FC<PageHeaderProps> = (props: PageHeaderProps) => {
    const context = useContext<GlobalAppStore>(GlobalAppStoreContext);
    console.log("HEADER", context.currentUser)
    const extensionService = useExtensionService();

    const onLogOut = () => {
        context.logoutAndClearCurrentUser();
        extensionService.removeToken();
        reloadPage();
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
                        <span className="user-full-name">
                            {context.currentUser.firstName} {context.currentUser.lastName}
                        </span>
                        <span className="user-email">{context.currentUser.email}</span>
                    </div>
                    <Button outlined={true} onClick={onLogOut}>Logout</Button>
                </div>
            }
        </div>
    );
}

export default observer(AppHeader);
