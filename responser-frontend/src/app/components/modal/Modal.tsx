import React, {PropsWithChildren} from "react";
import ReactModal from "react-modal";
import classNames from "classnames";
import {Button, ButtonType} from "../button/Button";
import "./Modal.less";
import {ConditionShow} from "../ConditionShow";

export type ModalProps = PropsWithChildren<{
    isOpen: boolean;
    header: string;
    className?: string;
    onOk?: () => void;
    onCancel?: () => void;

}>;

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
    const {isOpen, className, children, header, onOk, onCancel} = props;
    const resultClassName = classNames("modal", className);

    return (
        <ReactModal isOpen={isOpen} className={resultClassName} overlayClassName="modal-overlay" ariaHideApp={false}>
            <h1 className="modal-header">{header}</h1>
            <div className="modal-body">
                {children}
            </div>
            <ConditionShow condition={!!onOk || !!onCancel}>
                <ConditionShow condition={!!onCancel}>
                    <Button styleType={ButtonType.LIGHT} onClick={onCancel}>OK</Button>
                </ConditionShow>
                <ConditionShow condition={!!onOk}>
                    <Button onClick={onOk}>OK</Button>
                </ConditionShow>
            </ConditionShow>
        </ReactModal>
    );
}