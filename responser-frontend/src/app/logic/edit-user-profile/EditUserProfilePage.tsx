import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react";
import Page from "../../components/page/Page";
import EditUserForm from "./form/EditUserProfileForm";
import {useEditUserPageStore} from "./EditUserProfilePageStore";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {Spinner} from "../../components/spinner/Spinner";
import {navigateTo, reloadPage} from "../../utils/NavigationUtils";
import {Modal} from "../../components/modal/Modal";
import "./EditUserProfilePage.less";
import EditPasswordForm from "./form/EditPasswordForm";

export const EDIT_USER_PAGE_URL = "/edit-user";

export const navigateToEditUserPage = () => {
    navigateTo(EDIT_USER_PAGE_URL);
}

const EditUserProfilePage: React.FC = () => {
    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const {
        init,
        updateUser,
        updateUserPayload,
        updateUserPasswordPayload,
        passwordsFilled,
        updatePassword,
        loadingState,
        userWasChanged
    } = useEditUserPageStore();

    const [isUserUpdated, setIsUserUpdated] = useState(false);
    const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

    useEffect(() => {
        if (!!currentUser) init(currentUser);
    }, [currentUser]);

    const onEditUserFinish = async (setFieldError?: (field: string, message: string) => void) => {
        await updateUser(setFieldError).then(() => setIsUserUpdated(true));
    }

    const onEditPasswordFinish = async (setFieldError?: (field: string, message: string) => void) => {
        await updatePassword(setFieldError).then(() => setIsPasswordUpdated(true));
    }

    return (
        <Page className="edit-user-page">
            <div className="edit-form-panel">
                <h2 className="edit-header">User profile</h2>
                {
                    !!updateUserPayload
                        ? <EditUserForm updateUserPayload={updateUserPayload}
                                        onFinish={onEditUserFinish}
                                        disabled={loadingState.isDataSubmitting}
                                        userWasChanged={userWasChanged}/>
                        : <Spinner className="edit-loading-spinner"/>
                }
            </div>

            <Modal isOpen={isUserUpdated} header="Done" onOk={reloadPage}>
                User profile data changes was successfully saved.
            </Modal>

            <div className="edit-form-panel">
                <h2 className="edit-header">User password</h2>
                {
                    !!updateUserPayload
                        ? <EditPasswordForm updateUserPasswordPayload={updateUserPasswordPayload}
                                            onFinish={onEditPasswordFinish}
                                            disabled={loadingState.isDataSubmitting}
                                            passwordsFilled={passwordsFilled}/>
                        : <Spinner className="edit-loading-spinner"/>
                }
            </div>

            <Modal isOpen={isPasswordUpdated} header="Done" onOk={reloadPage}>
                User profile data changes was successfully saved.
            </Modal>
        </Page>
    );
}

export default observer(EditUserProfilePage);
