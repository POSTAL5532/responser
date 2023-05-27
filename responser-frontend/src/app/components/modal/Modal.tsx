import React, {PropsWithChildren} from "react";
import ReactModal from "react-modal";
import classNames from "classnames";
import {Button} from "../button/Button";
import "./Modal.less";

export type ModalProps = PropsWithChildren<{
    isOpen: boolean;
    header: string;
    className?: string;
    onOk?: () => void;

}>;

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
    const {isOpen, className, children, header, onOk} = props;
    const resultClassName = classNames("modal", className);

    return (
        <ReactModal isOpen={isOpen} className={resultClassName} overlayClassName="modal-overlay">
            <h1 className="modal-header">{header}</h1>
            <div className="modal-body">
                {children}
            </div>
            {
                !!onOk && <div className="modal-footer">
                    <Button onClick={onOk}>OK</Button>
                </div>
            }
        </ReactModal>
    );
}