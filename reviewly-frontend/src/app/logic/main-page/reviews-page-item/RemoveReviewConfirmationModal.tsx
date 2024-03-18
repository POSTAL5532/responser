import React from "react";
import Modal from "../../../components/modal/Modal";
import {Button, ButtonType} from "../../../components/button/Button";
import {Icon, IconType} from "../../../components/icon/Icon";
import "./RemoveReviewConfirmationModal.less";

type RemoveReviewConfirmationModalProps = {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    removing: boolean;
}

export const RemoveReviewConfirmationModal: React.FC<RemoveReviewConfirmationModalProps> = (props: RemoveReviewConfirmationModalProps) => {
    const {show, removing, onClose, onConfirm} = props;

    return(
        <Modal isOpen={show} onClose={onClose} className="remove-review-confirmation" disableControls={removing}>
            <Modal.Body>
                <h2 className="remove-question">Do you really want to remove review?</h2>
                <div className="confirmation-controls">
                    <Button disabled={removing} loading={removing} styleType={ButtonType.PRIMARY} onClick={onConfirm}>
                        <Icon type={IconType.CHECK}/> Confirm
                    </Button>
                    <Button disabled={removing} onClick={onClose}><Icon type={IconType.CLOSE}/> Cancel</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
