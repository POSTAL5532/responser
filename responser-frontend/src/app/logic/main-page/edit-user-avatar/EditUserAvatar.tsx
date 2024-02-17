import React, {useContext, useState} from "react";
import {observer} from "mobx-react";
import classNames from "classnames";
import Modal from "../../../components/modal/Modal";
import {useEditUserAvatarStore} from "./EditUserAvatarStore";
import {GlobalAppStore, GlobalAppStoreContext} from "../../../GlobalAppStore";
import {ConditionShow} from "../../../components/ConditionShow";
import {DragAndDrop} from "../../../components/drug-n-drop/DragAndDrop";
import {FILE_TYPE} from "../../../utils/FileUtils";
import {Button, ButtonType} from "../../../components/button/Button";
import {EditUserAvatarForm} from "./EditUserAvatarForm";
import {getUserAvatarUrl} from "../../../utils/ResourcesUtils";
import {Icon, IconType} from "../../../components/icon/Icon";
import "./EditUserAvatar.less";

type EditUserAvatarProps = {
    show: boolean;
    onClose: () => void;
}

const EditUserAvatar: React.FC<EditUserAvatarProps> = (props: EditUserAvatarProps) => {
    const {show, onClose} = props;
    const {currentUser, refreshCurrentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const [showUserAvatar, setShowUserAvatar] = useState(true);

    const {
        rawUserAvatar,
        loadingState,
        setUserRawAvatar,
        saveUserAvatar
    } = useEditUserAvatarStore();

    const {isDataSubmitting} = loadingState;

    const onAvatarSave = (dataUrl: string, blob: Blob) => {
        saveUserAvatar(dataUrl, blob)
        .then(() => {
            refreshCurrentUser();
            setUserRawAvatar(null);
            setShowUserAvatar(true);
        });
    }

    const onAvatarEditCancel = () => {
        setUserRawAvatar(null);
        setShowUserAvatar(true);
    }

    const onAvatarReset = () => {
        setUserRawAvatar(null);
    }

    const onModalClose = () => {
        setUserRawAvatar(null);
        setShowUserAvatar(true);
        onClose();
    }

    return (
        <Modal isOpen={show} className="edit-user-avatar-modal" onClose={onModalClose}>
            <Modal.Body>
                <ConditionShow condition={showUserAvatar}>
                    <div className="show-avatar-container">
                        <h2 className="modal-title">Your profile picture</h2>
                        <img src={getUserAvatarUrl(currentUser)} alt="User avatar" className="user-avatar"/>
                        <div className="controls">
                            <Button
                                styleType={ButtonType.PRIMARY}
                                onClick={() => setShowUserAvatar(false)}
                                loading={isDataSubmitting}
                                disabled={isDataSubmitting}>
                                <Icon type={IconType.REFRESH}/> Change picture
                            </Button>
                            <Button disabled={isDataSubmitting}><Icon type={IconType.REMOVE}/> Delete picture</Button>
                        </div>
                    </div>
                </ConditionShow>

                <ConditionShow condition={!rawUserAvatar && !showUserAvatar}>
                    <div className="user-avatar-drag-drop">
                        <BackAction disabled={isDataSubmitting} onClick={onAvatarEditCancel}/>

                        <h2 className="modal-title">Upload new profile picture</h2>

                        <DragAndDrop onChange={setUserRawAvatar}
                                     maxFileSize={2048}
                                     acceptedFileTypes={[FILE_TYPE.png, FILE_TYPE.bmp, FILE_TYPE.jpeg, FILE_TYPE.jpeg]}/>

                        <div className="file-requirements">
                            <p className="supported-formats">Supported formats: jpeg, png, bmp</p>
                            <p className="max-file-size">Maximum file size: 2 Mb</p>
                        </div>
                    </div>
                </ConditionShow>

                <ConditionShow condition={!!rawUserAvatar}>
                    <div className="user-avatar-edit-form">
                        <BackAction disabled={isDataSubmitting} onClick={onAvatarReset}/>
                        <EditUserAvatarForm imageSrc={rawUserAvatar} onSave={onAvatarSave} loading={isDataSubmitting}/>
                    </div>
                </ConditionShow>
            </Modal.Body>
        </Modal>
    );
}

export default observer(EditUserAvatar);

type BackActionProps = {
    disabled: boolean;
    onClick: () => void;
    className?: string;
}

const BackAction: React.FC<BackActionProps> = (props: BackActionProps) => {
    const {disabled, onClick, className} = props;
    const resultClassName = classNames("back-action", className);

    return (
        <button className={resultClassName} onClick={onClick} disabled={disabled}>
            <Icon type={IconType.FULL_ARROW}/>
        </button>
    );
}
