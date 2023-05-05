import React, {useContext, useState} from "react";
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
import {useEmailConfirmationService} from "../../service/EmailConfirmationService";
import {Spinner} from "../../components/spinner/Spinner";
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
            <div className="header-title">{props.title}</div>
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

const UserEmailConfirmationAlert: React.FC = () => {
    const emailConfirmationService = useEmailConfirmationService();
    const [resendConfirmationProcess, setResendConfirmationProcess] = useState<boolean>(false);
    const [confirmationResent, setConfirmationResent] = useState<boolean>(false);

    const onResendClick = () => {
        setResendConfirmationProcess(true);
        emailConfirmationService.resendConfirmationEmail()
        .finally(() => {
            setResendConfirmationProcess(false);
            setConfirmationResent(true);
        });
    }

    const confirmationResentContent = <>
        <h3>Confirmation link was sent.</h3>
        <p>Confirm your email by confirmation link. If you didn't receive the link after registration try to check the spam.</p>
        <div className="confirmation-link-sent-icon-container">
            <Icon type={IconType.CIRCLE_CHECK}/>
        </div>
    </>

    const confirmationDidntResendContent = <>
        <h3>Your email doesn't confirmed.</h3>
        <p>
            So you can't to leave reviews and react for other reviews. If you didn't receive the link after registration try to check the spam or
            resend email confirmation to your mail box and confirm your email.
        </p>
        <Button styleType={ButtonType.PRIMARY} onClick={onResendClick} disabled={resendConfirmationProcess}>{
            resendConfirmationProcess
                ? <Spinner size={30}/>
                : "Resend confirmation link"
        }</Button>
    </>

    return (
        <>
            <div data-tooltip-id="user-alert-tooltip" className="user-alert">
                <Icon type={IconType.ALERT}/>
            </div>
            <Tooltip id="user-alert-tooltip" openOnClick={true} className="user-alert-tooltip" clickable={true}>
                {confirmationResent ? confirmationResentContent : confirmationDidntResendContent}
            </Tooltip>
        </>
    );
}

export default observer(AppHeader);
