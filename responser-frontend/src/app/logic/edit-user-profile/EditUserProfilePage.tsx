import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react";
import {Page} from "../../components/page/Page";
import EditUserForm from "./form/EditUserProfileForm";
import {useEditUserPageStore} from "./EditUserProfilePageStore";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {Spinner} from "../../components/spinner/Spinner";
import {navigateTo} from "../../utils/NavigationUtils";
import "./EditUserProfilePage.less";

export const EDIT_USER_PAGE_URL = "/edit-user";

export const navigateToEditUserPage = () => {
    navigateTo(EDIT_USER_PAGE_URL);
}

const EditUserProfilePage: React.FC = () => {
    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const {init, updateUser, updateUserPayload, loadingState, userWasChanged} = useEditUserPageStore();

    useEffect(() => {
        if (!!currentUser) init(currentUser);
    }, [currentUser]);

    const onFinish = async (setFieldError?: (field: string, message: string) => void) => {
        await updateUser(setFieldError);
    }

    return (
        <Page className="edit-user-page">
            <div className="edit-user-form-panel">
                <h2 className="edit-user-header">User profile</h2>
                {
                    !!updateUserPayload
                        ? <EditUserForm updateUserPayload={updateUserPayload}
                                        onFinish={onFinish}
                                        disabled={loadingState.isDataSubmitting}
                                        userWasChanged={userWasChanged}/>
                        : <Spinner className="edit-user-xloading-spinner"/>
                }
            </div>
        </Page>
    );
}

export default observer(EditUserProfilePage);
