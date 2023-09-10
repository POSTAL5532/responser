import React, {useContext, useEffect, useState} from "react";
import Page from "../../components/page/Page";
import {Spinner} from "../../components/spinner/Spinner";
import {UserProfileProperty} from "./UserProfileProperty";
import {UserProfileEmailProperty} from "./UserProfileEmailProperty";
import {User} from "../../model/User";
import {observer} from "mobx-react";
import {navigateTo} from "../../utils/NavigationUtils";
import {useUserProfilePageStore} from "./UserProfilePageStore";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {Button} from "../../components/button/Button";
import {navigateToEditUserPage} from "../edit-user-profile/EditUserProfilePage";
import {Modal} from "../../components/modal/Modal";
import "./UserProfilePage.less";

export const USER_PROFILE_PAGE_URL = "/user-profile";

export const navigateToUserProfilePage = () => {
    navigateTo(USER_PROFILE_PAGE_URL);
}

const UserProfilePage: React.FC = () => {
    const context = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const {init, currentUser, loadingState, resendConfirmationEmail, isConfirmationResent} = useUserProfilePageStore();
    const {resendConfirmationProcess} = loadingState;
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!!context.currentUser) init(context.currentUser.id);
    }, [context.currentUser]);

    const onConfirmationResend = () => {
        resendConfirmationEmail()
        .then(() => setIsModalOpen(true));
    }

    return (
        <Page className="user-profile-page">
            <div className="user-profile-panel">
                <h2 className="user-profile-header">User profile</h2>
                <UserProfilePanelContent user={currentUser}
                                         loading={!currentUser}
                                         resendConfirmationProcess={resendConfirmationProcess}
                                         onConfirmationResend={onConfirmationResend}
                                         confirmationResent={isConfirmationResent}/>
            </div>

            <Modal isOpen={isModalOpen} header="Done" onOk={() => setIsModalOpen(false)}>
                Confirmation message was resent. Check your mailbox and confirm email. If message didn't receive - check spam folder.
            </Modal>
        </Page>
    );
}

export default observer(UserProfilePage);

type UserProfilePanelContentProps = {
    user: User;
    loading: boolean;
    onConfirmationResend: () => void;
    resendConfirmationProcess: boolean;
    confirmationResent: boolean;
}

const UserProfilePanelContent: React.FC<UserProfilePanelContentProps> = (props: UserProfilePanelContentProps) => {
    const {loading, user, onConfirmationResend, resendConfirmationProcess, confirmationResent} = props;

    if (loading) return <Spinner className="user-profile-loading-spinner"/>;

    return (
        <>
            <UserProfileEmailProperty email={user.email}
                                      needEmailConfirmation={!user.emailConfirmed}
                                      onResend={onConfirmationResend}
                                      resendConfirmationProcess={resendConfirmationProcess}
                                      confirmationResent={confirmationResent}/>

            <UserProfileProperty label="Username" value={user.userName}/>
            <UserProfileProperty label="Full name" value={user.fullName}/>

            <Button className="edit-user-profile" onClick={navigateToEditUserPage} disabled={resendConfirmationProcess}>Edit profile</Button>
        </>
    );
}
