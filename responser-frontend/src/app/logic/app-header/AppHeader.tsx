import React, {useContext} from "react";
import {observer} from "mobx-react";
import {Button} from "app/components/button/Button";
import {GlobalAppStore, GlobalAppStoreContext} from "app/GlobalAppStore";
import "app/logic/app-header/AppHeader.less";

type PageHeaderProps = {
    title: string;
}

export const AppHeader: React.FC<PageHeaderProps> = observer((props: PageHeaderProps) => {
    const context = useContext<GlobalAppStore>(GlobalAppStoreContext);

    const onLogOut = () => {
        context.logoutAndClearCurrentUser();
        window.location.reload();
    }

    const onUserInfoClick = () => {
        console.log("ON USER INFO CLICK")
    }

    return (
        <div className="app-header">
            <div className="header-title">{props.title}</div>
            {
                context.isAuthorized &&
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
});