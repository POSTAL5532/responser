import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {Button, ButtonSize, ButtonType} from "../button/Button";
import "./DropDownMenuButton.less";

type DropDownMenuButtonChildrenFCType = (closeMenu: () => void, openMenu: () => void) => JSX.Element;

type DropDownMenuButtonProps = {
    label: React.ReactNode;
    children: DropDownMenuButtonChildrenFCType | React.ReactNode;
    className?: string;
    onClick?: () => void;
    onOpen?: () => void;
    onClose?: () => void;
    onStateChange?: (isOpen: boolean) => void;
    styleType?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
}

export const DropDownMenuButton: React.FC<DropDownMenuButtonProps> = (props: DropDownMenuButtonProps) => {
    const {
        label,
        size,
        className,
        styleType = ButtonType.DEFAULT,
        onClick,
        onOpen,
        onClose,
        onStateChange,
        children
    } = props;

    const [active, setActive] = useState<boolean>(false);
    const resultClassName = classNames("drop-down-menu-button", {"active": active}, className);

    const buttonRef = useRef(null);
    const containerRef = useRef(null);

    const openDropdown = () => {
        setActive(true);
        onStateChange?.(true);
        onOpen?.();
        console.log("Call OPEN")
    }

    const closeDropdown = () => {
        setActive(false);
        onStateChange?.(false);
        onClose?.();
    }

    useOutsideAlerter(buttonRef, containerRef, closeDropdown);

    const onButtonClick = () => {
        onClick?.();

        if (!active) {
            openDropdown();
        } else {
            closeDropdown();
        }
    }

    const renderChildren = () => {
        if (!!children && typeof children === 'function') {
            return (children as Function)(closeDropdown, openDropdown);
        }

        return children;
    }

    return (
        <div className={resultClassName}>
            <Button onClick={onButtonClick} disabled={false} size={size} styleType={styleType} ref={buttonRef} loading={false}>{label}</Button>

            <div className="drop-down-menu" ref={containerRef}>{renderChildren()}</div>
        </div>
    );
}

const useOutsideAlerter = (ref: any, ref2: any, callback: () => void) => {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        const handleClickOutside = (event: Event) => {
            if (ref.current && !ref.current.contains(event.target) && ref2.current && !ref2.current.contains(event.target)) {
                callback();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}
