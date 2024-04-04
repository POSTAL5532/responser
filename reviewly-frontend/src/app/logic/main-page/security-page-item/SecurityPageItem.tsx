import React, {useState} from "react";
import {PageName} from "../../../components/page-name/PageName";
import {PageItem} from "../PageItem";
import EditPasswordForm from "./EditPasswordForm";
import {observer} from "mobx-react";
import {useSecurityPageItemStore} from "./SecurityPageItemStore";
import Modal from "../../../components/modal/Modal";
import {Button, ButtonType} from "../../../components/button/Button";
import LocalTokenStorageService from "../../../service/authorization/LocalTokenStorageService";
import {nativeNavigateToAuthLogoutPageUrl} from "../../../utils/NavigationUtils";
import {useExtensionService} from "../../../service/extension/ExtensionService";
import {useLogger} from "../../../utils/Logger";
import "./SecurityPageItem.less";

type SecurityPageItemProps = {
    hidden: boolean;
}

const SecurityPageItem: React.FC<SecurityPageItemProps> = (props: SecurityPageItemProps) => {
    const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

    const logger = useLogger("SecurityPageItem");
    const extensionService = useExtensionService();
    const logOut = () => {
        logger.debug("Logout click")
        LocalTokenStorageService.removeAllTokens()

        extensionService.removeToken()
        .catch(reason => logger.error(reason))
        .finally(() => {
            logger.debug("Redirect to auth server logout page");
            nativeNavigateToAuthLogoutPageUrl();
        });
    }

    const {
        updateUserPasswordPayload,
        passwordsFilled,
        loadingState,
        updatePassword
    } = useSecurityPageItemStore();

    const onEditPasswordFinish = async (setFieldError?: (field: string, message: string) => void) => {
        await updatePassword(setFieldError).then(result => setIsPasswordUpdated(result));
    }

    return (
        <PageItem hidden={props.hidden} className="security-page-item">
            <PageName>Security settings</PageName>

            <div className="change-password-form-container">
                <EditPasswordForm
                    updateUserPasswordPayload={updateUserPasswordPayload}
                    onFinish={onEditPasswordFinish}
                    isLoading={loadingState.isPasswordUpdating}
                    passwordsFilled={passwordsFilled}/>
            </div>

            <Modal isOpen={isPasswordUpdated} onClose={logOut} className="password-updated-modal">
                <Modal.Body>
                    <p className="result-text">Password changes was successfully saved. Now you need to login with new password.</p>
                    <Button onClick={logOut} styleType={ButtonType.PRIMARY}>Ok</Button>
                </Modal.Body>
            </Modal>
        </PageItem>
    );
}

export default observer(SecurityPageItem);
