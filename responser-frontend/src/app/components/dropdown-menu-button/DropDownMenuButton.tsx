import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {Button, ButtonSize, ButtonType} from "../button/Button";
import "./DropDownMenuButton.less";

export type MenuItem = {
    label: React.ReactNode;
    onClick?: () => void;
}

type DropDownMenuButtonProps = {
    label: React.ReactNode;
    activeLabel?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    dropdownMenuItems?: MenuItem[];
    styleType?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
}

export const DropDownMenuButton: React.FC<DropDownMenuButtonProps> = (props: DropDownMenuButtonProps) => {
    const {label, activeLabel, size, className, styleType = ButtonType.SECONDARY, onClick, disabled, dropdownMenuItems} = props;
    const [active, setActive] = useState<boolean>(false);
    const resultClassName = classNames("drop-down-menu-button", {"active": active}, {"disabled": disabled}, size, className);

    const buttonRef = useRef(null);
    const containerRef = useRef(null);

    useOutsideAlerter(buttonRef, containerRef, () => setActive(false));

    const onButtonClick = () => {
        onClick?.();
        setActive(!active);
    }

    const onItemClick = (originalCallBack: () => void) => {
        originalCallBack?.();
        setActive(false);
    }

    const mapMenuItems = () => {
        return dropdownMenuItems?.map((item, index) => (
            <DropDownMenuItem key={index} label={item.label} onClick={() => onItemClick(item.onClick)}/>
        ));
    }

    return (
        <div className={resultClassName}>
            <Button onClick={onButtonClick} disabled={false} size={size} styleType={styleType} ref={buttonRef} loading={false}>{
                active ? (activeLabel ? activeLabel : label) : label
            }</Button>
            <div className="drop-down-menu" ref={containerRef}>{mapMenuItems()}</div>
        </div>
    );
}

export const DropDownMenuItem: React.FC<MenuItem> = (props: MenuItem) => {
    return (
        <div className="dropdown-menu-item" onClick={props.onClick}>
            {props.label}
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
