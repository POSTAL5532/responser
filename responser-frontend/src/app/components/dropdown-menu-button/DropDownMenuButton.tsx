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
    const [dropdownContainerHeight, setDropdownContainerHeight] = useState<number>(0);
    const resultClassName = classNames("dropdown-menu-button", {"active": active}, className);

    const buttonRef = useRef(null);
    const containerRef = useRef(null);

    const openDropdown = () => {
        setDropdownContainerHeight(containerRef.current.clientHeight);
        setActive(true);
        onStateChange?.(true);
        onOpen?.();
    }

    const closeDropdown = () => {
        setDropdownContainerHeight(0);
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
            <Button
                className="dropdown-menu-trigger"
                onClick={onButtonClick}
                disabled={false}
                size={size}
                styleType={styleType}
                ref={buttonRef}
                loading={false}>
                {label}
            </Button>

            <div className="dropdown-menu-container" style={{height: dropdownContainerHeight}}>
                <div className="dropdown-menu" ref={containerRef}>{renderChildren()}</div>
            </div>
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
