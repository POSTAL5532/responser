import React, {useContext} from "react";
import {observer} from "mobx-react";
import {Tooltip} from "react-tooltip";
import {Button, ButtonType} from "app/components/button/Button";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {nativeNavigateTo, navigateTo} from "../../utils/NavigationUtils";
import ApplicationProperties from "../../service/ApplicationProperties";
import LocalTokenStorageService from "../../service/authorization/LocalTokenStorageService";
import {Icon, IconType} from "../../components/icon/Icon";
import {useLogger} from "../../utils/Logger";
import {navigateToUserProfilePage} from "../user-profile/UserProfilePage";
import {DropDownMenuButton} from "../../components/dropdown-menu-button/DropDownMenuButton";
import {navigateToMainPage} from "../main-page/MainPage";
import classNames from "classnames";
import "./AppHeader.less";
import {RESTORE_PASSWORD_PAGE_URL} from "../restore-password/RestorePasswordPage";

type PageHeaderProps = {
    title: string;
}

const AppHeader: React.FC<PageHeaderProps> = (props: PageHeaderProps) => {
    const {currentUser, hideHeader} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const extensionService = useExtensionService();
    const logger = useLogger("AppHeader");
    const resultClassName = classNames("app-header", {"hidden": hideHeader});

    const onLogOut = () => {
        logger.debug("Logout click")
        LocalTokenStorageService.removeAllTokens()
        extensionService.removeToken().finally(() => {
            logger.debug("Redirect to auth server logout page")
            nativeNavigateTo(ApplicationProperties.authLogoutPageUrl);
        });
    }

    return (
        <div className={resultClassName}>
            <div className="header-title" onClick={() => navigateToMainPage(false)}>
                <Icon type={IconType.REVIEWLY_LOGO}/> {props.title}
            </div>

            {
                currentUser &&
                <div className="user-block">
                    <div className="user-info">
                        {!currentUser.emailConfirmed && <UserEmailConfirmationAlert/>}
                        <span className="user-full-name">{currentUser.fullName}</span>
                    </div>
                    <DropDownMenuButton label={<Icon type={IconType.SANDWICH}/>} activeLabel={<Icon type={IconType.CANCEL}/>} dropdownMenuItems={[
                        {label: <>Profile <Icon type={IconType.USER}/></>, onClick: navigateToUserProfilePage},
                        {label: <>Logout <Icon type={IconType.LOGOUT}/></>, onClick: onLogOut},
                    ]}/>
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
