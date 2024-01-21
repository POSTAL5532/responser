import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react";
import Page from "../../components/page/Page";
import EditUserForm from "./form/EditUserProfileForm";
import {useEditUserPageStore} from "./EditUserProfilePageStore";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {Spinner} from "../../components/spinner/Spinner";
import {navigateTo, reloadPage} from "../../utils/NavigationUtils";
import {Modal} from "../../components/modal/Modal";
import EditPasswordForm from "./form/EditPasswordForm";
import EditUserAvatarForm from "./form/EditUserAvatarForm";
import userAvatarPlaceHolder from "../../../images/user-avatar-placeholder.png";
import {DragAndDrop} from "../../components/drug-n-drop/DragAndDrop";
import {Button, ButtonType} from "../../components/button/Button";
import {ConditionShow} from "../../components/ConditionShow";
import ApplicationProperties from "../../service/ApplicationProperties";
import {FILE_TYPE} from "../../utils/FileUtils";
import "./EditUserProfilePage.less";

export const EDIT_USER_PAGE_URL = "/edit-user";

export const navigateToEditUserPage = () => {
    navigateTo(EDIT_USER_PAGE_URL);
}

const EditUserProfilePage: React.FC = () => {
    const {currentUser, refreshCurrentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const editUserStore = useEditUserPageStore();
    const {
        init,
        updateUser,
        updateUserPayload,
        updateUserPasswordPayload,
        passwordsFilled,
        updatePassword,
        loadingState,
        userWasChanged,
        setUserRawAvatar,
        rawUserAvatar,
        saveUserAvatar
    } = editUserStore;

    const [isUserUpdated, setIsUserUpdated] = useState(false);
    const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
    const [editUserAvatarMode, setEditUserAvatarMode] = useState(false);

    useEffect(() => {
        if (!!currentUser) init(currentUser);
    }, [currentUser]);

    const onEditUserFinish = async (setFieldError?: (field: string, message: string) => void) => {
        await updateUser(setFieldError).then(() => setIsUserUpdated(true));
    }

    const onEditPasswordFinish = async (setFieldError?: (field: string, message: string) => void) => {
        await updatePassword(setFieldError).then(() => setIsPasswordUpdated(true));
    }

    const onAvatarSave = (dataUrl: string, blob: Blob) => {
        saveUserAvatar(dataUrl, blob)
        .then(refreshCurrentUser);

        setEditUserAvatarMode(false);
        setUserRawAvatar(null);
    }

    const onAvatarEditCancel = () => {
        setEditUserAvatarMode(false);
        setUserRawAvatar(null);
    }

    const onAvatarReset = () => {
        setUserRawAvatar(null)
    }

    return (
        <Page className="edit-user-page">

            <div className="edit-form-panel">
                <img alt="User avatar" className="user-avatar" src={
                    !!currentUser?.avatarFileName
                        ? (ApplicationProperties.fileStorageUrl + "/" + currentUser.avatarFileName)
                        : userAvatarPlaceHolder
                }/>
                <Button onClick={() => setEditUserAvatarMode(true)}>Change avatar</Button>
            </div>

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

            <Modal isOpen={editUserAvatarMode} header="Done">
                <ConditionShow condition={!rawUserAvatar}>
                    <DragAndDrop onChange={setUserRawAvatar}
                                 maxFileSize={2048}
                                 acceptedFileTypes={[FILE_TYPE.png, FILE_TYPE.bmp, FILE_TYPE.jpeg, FILE_TYPE.jpeg]}/>
                    <Button onClick={onAvatarEditCancel} styleType={ButtonType.LIGHT}>Cancel</Button>
                </ConditionShow>
                <ConditionShow condition={!!rawUserAvatar}>
                    <EditUserAvatarForm imageSrc={rawUserAvatar} onSave={onAvatarSave} onCancel={onAvatarEditCancel}/>
                    <Button onClick={onAvatarReset}>Reset</Button>
                </ConditionShow>
            </Modal>
        </Page>
    );
}

export default observer(EditUserProfilePage);
