import React, {useContext} from "react";
import {observer} from "mobx-react";
import {Tooltip} from "react-tooltip";
import {Button, ButtonType} from "app/components/button/Button";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {nativeNavigateTo} from "../../utils/NavigationUtils";
import ApplicationProperties from "../../service/ApplicationProperties";
import LocalTokenStorageService from "../../service/authorization/LocalTokenStorageService";
import {Icon, IconType} from "../../components/icon/Icon";
import {useLogger} from "../../utils/Logger";
import {navigateToUserProfilePage} from "../user-profile/UserProfilePage";
import "./AppHeader.less";

type PageHeaderProps = {
    title: string;
}

const AppHeader: React.FC<PageHeaderProps> = (props: PageHeaderProps) => {
    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const extensionService = useExtensionService();
    const logger = useLogger("AppHeader");

    const onLogOut = () => {
        logger.debug("Logout click")
        LocalTokenStorageService.removeAllTokens()
        extensionService.removeToken().finally(() => {
            logger.debug("Redirect to auth server logout page")
            nativeNavigateTo(ApplicationProperties.authLogoutPageUrl);
        });
    }

    return (
        <div className="app-header">
            <div className="header-title"><Icon type={IconType.REVIEWLY_LOGO}/> {props.title}</div>
            {
                currentUser &&
                <div className="user-block">
                    <div className="user-info">
                        {!currentUser.emailConfirmed && <UserEmailConfirmationAlert/>}
                        <span className="user-full-name">{currentUser.fullName}</span>
                    </div>
                    <Button onClick={onLogOut}>Logout <Icon type={IconType.LOGOUT}/></Button>
                </div>
            }
        </div>
    );
}

const UserEmailConfirmationAlert: React.FC = () => (
    <>
        <div data-tooltip-id="user-alert-tooltip" className="user-alert">
            <Icon type={IconType.ALERT}/>
        </div>
        <Tooltip id="user-alert-tooltip" className="user-alert-tooltip" clickable={true} delayHide={500}>
            <h3>Your email doesn't confirmed.</h3>
            <p>
                So you can't to leave reviews and react for other reviews. If you didn't receive the link after registration try to check the spam or
                resend email confirmation to your mail box and confirm your email.
            </p>
            <Button styleType={ButtonType.PRIMARY} onClick={navigateToUserProfilePage}>Go to profile settings</Button>
        </Tooltip>
    </>
);

export default observer(AppHeader);
