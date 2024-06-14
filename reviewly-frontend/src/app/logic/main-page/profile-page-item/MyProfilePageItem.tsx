import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react";
import {PageItem} from "../PageItem";
import {PageName} from "../../../components/page-name/PageName";
import {GlobalAppStore, GlobalAppStoreContext} from "../../../GlobalAppStore";
import {useMyProfilePageItemStore} from "./MyProfilePageItemStore";
import EditUserForm from "./EditUserProfileForm";
import Modal from "../../../components/modal/Modal";
import {nativeNavigateTo} from "../../../utils/NavigationUtils";
import {Button, ButtonType} from "../../../components/button/Button";
import {MAIN_PAGE_URL} from "../MainPage";
import {MainPageNavigation} from "../MainPageStore";
import "./MyProfilePageItem.less";

type MyProfilePageItemProps = {
    hidden: boolean;
}

const MyProfilePageItem: React.FC<MyProfilePageItemProps> = (props: MyProfilePageItemProps) => {
    const {hidden} = props;
    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const editUserStore = useMyProfilePageItemStore();
    const [isUserUpdated, setIsUserUpdated] = useState(false);
    const [isEmailConfirmationSentModal, setIsEmailConfirmationSentModal] = useState(false);

    const {
        init,
        updateUser,
        updateUserPayload,
        loadingState,
        userWasChanged,
        isConfirmationResent,
        resendConfirmationEmail
    } = editUserStore;

    useEffect(() => {
        if (!!currentUser) init(currentUser);
    }, [currentUser]);

    const onEditUserFinish = async (setFieldError?: (field: string, message: string) => void) => {
        await updateUser(setFieldError).then((result) => setIsUserUpdated(result));
    }

    const onUpdateUserConfirmationClose = () => {
        nativeNavigateTo(MAIN_PAGE_URL + "?item=" + MainPageNavigation.PROFILE);
    }

    const onEmailConfirmationResend = () => {
        resendConfirmationEmail().then(() => setIsEmailConfirmationSentModal(true));
    }

    return (
        <PageItem hidden={hidden} className="my-profile-page-item">
            <PageName>My profile</PageName>

            <div className="edit-user-form-container">
                <EditUserForm
                    updateUserPayload={updateUserPayload}
                    isUserBlocked={currentUser?.isBlocked}
                    onFinish={onEditUserFinish}
                    loading={loadingState.isDataSubmitting}
                    userWasChanged={userWasChanged}
                    isEmailConfirmed={currentUser?.emailConfirmed}
                    userRegisteredBy={currentUser?.registeredBy}
                    isEmailConfirmationProcess={loadingState.resendConfirmationProcess}
                    isConfirmationResent={isConfirmationResent}
                    resendConfirmationEmail={onEmailConfirmationResend}/>
            </div>

            <Modal isOpen={isUserUpdated} onClose={onUpdateUserConfirmationClose} className="result-modal user-data-saved-modal">
                <Modal.Body>
                    <p className="result-text">User profile data changes was successfully saved.</p>
                    <Button styleType={ButtonType.PRIMARY} onClick={onUpdateUserConfirmationClose}>Ok</Button>
                </Modal.Body>
            </Modal>

            <Modal isOpen={isEmailConfirmationSentModal} onClose={() => setIsEmailConfirmationSentModal(false)} className="result-modal email-confirmation-resent-modal">
                <Modal.Body>
                    <p className="result-text">Confirmation message was resent. Check your mailbox and confirm email. If message didn't receive - check spam folder.</p>
                    <Button styleType={ButtonType.PRIMARY} onClick={() => setIsEmailConfirmationSentModal(false)}>Ok</Button>
                </Modal.Body>
            </Modal>
        </PageItem>
    );
}

export default observer(MyProfilePageItem);
