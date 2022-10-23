import React, {useContext} from "react";
import {observer} from "mobx-react";
import {NavLink } from "react-router-dom";
import {Button} from "app/components/button/Button";
import {GlobalAppStore, GlobalAppStoreContext} from "app/GlobalAppStore";
import {MAIN_PAGE_URL} from "app/logic/main-page/MainPage";
import {FACEBOOK_PAGE_URL} from "app/logic/facebook-page/FacebookPage";
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
                <div className="navigation">
                    <NavLink to={MAIN_PAGE_URL}>Main page</NavLink>
                    <NavLink to={FACEBOOK_PAGE_URL}>Facebook</NavLink>
                </div>
            }
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