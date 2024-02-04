import React, {PropsWithChildren} from "react";
import ReactModal from "react-modal";
import classNames from "classnames";
import {ConditionShow} from "../ConditionShow";
import {Icon, IconType} from "../icon/Icon";
import "./Modal.less";

const MODAL_HEADER_DISPLAY_NAME = "Header";
const MODAL_BODY_DISPLAY_NAME = "Body";
const MODAL_FOOTER_DISPLAY_NAME = "Footer";

const getChildrenOnDisplayName = (children: React.ReactNode, displayName: string) => (
    React.Children.map(
        children,
        (child: any) => child.type.displayName === displayName ? child : null
    )
);

type ModalProps = PropsWithChildren<{
    isOpen: boolean;
    className?: string;
}>;

type ModalSubcomponents = {
    Header: React.FC<HeaderProps>;
    Body: React.FC<PropsWithChildren>;
    Footer: React.FC<PropsWithChildren>;
}

const Modal: React.FC<ModalProps> & ModalSubcomponents = (props: ModalProps) => {
    const {isOpen, className, children} = props;

    const resultClassName = classNames("modal", className);

    const header = getChildrenOnDisplayName(children, MODAL_HEADER_DISPLAY_NAME);
    const body = getChildrenOnDisplayName(children, MODAL_BODY_DISPLAY_NAME);
    const footer = getChildrenOnDisplayName(children, MODAL_FOOTER_DISPLAY_NAME);

    return (
        <ReactModal isOpen={isOpen} className={resultClassName} overlayClassName="modal-overlay" ariaHideApp={false}>
            {header}
            {body}
            {footer}
        </ReactModal>
    );
}

export default Modal;

type HeaderProps = PropsWithChildren<{
    onClose?: () => void;
}>;

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    const {children, onClose} = props;

    return(
        <div className="modal-header">
            {children}

            <ConditionShow condition={!!onClose}>
                <button className="close-modal" onClick={onClose}><Icon type={IconType.CLOSE}/></button>
            </ConditionShow>
        </div>
    );
}

Header.displayName = MODAL_HEADER_DISPLAY_NAME;
Modal.Header = Header;

const Body: React.FC<PropsWithChildren> = (props: PropsWithChildren) => {
    return(
        <div className="modal-body">
            {props.children}
        </div>
    );
}

Body.displayName = MODAL_BODY_DISPLAY_NAME;
Modal.Body = Body;

const Footer: React.FC<PropsWithChildren> = (props: PropsWithChildren) => {
    return(
        <div className="modal-footer">
            {props.children}
        </div>
    );
}

Footer.displayName = MODAL_FOOTER_DISPLAY_NAME;
Modal.Footer = Footer;
