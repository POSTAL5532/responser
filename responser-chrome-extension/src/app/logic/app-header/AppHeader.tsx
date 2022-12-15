import React, {useContext} from "react";
import {observer} from "mobx-react";
import {Button} from "../../components/button/Button";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {User} from "../../model/User";
import "./AppHeader.less";

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
                    ? <UserInfo user={context.currentUser} onLogOutClick={onLogOut} onUserInfoClick={onUserInfoClick}/>
                    : <Button className="logout-button" outlined={true} onClick={onLoginClick}>Login</Button>
            }
        </div>
    );
});

type UserInfoProps = {
    user: User;
    onUserInfoClick: () => void;
    onLogOutClick: () => void;
}

const UserInfo: React.FC<UserInfoProps> = (props: UserInfoProps) => {
    const {user, onUserInfoClick, onLogOutClick} = props;

    return (
        <div className="user-block">
            <div className="user-info" onClick={onUserInfoClick}>
                <span className="user-full-name">
                    {user.firstName} {user.lastName}
                </span>
            </div>
            <Button outlined={true} onClick={onLogOutClick}>Logout</Button>
        </div>
    );
}
