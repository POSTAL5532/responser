import React, {PropsWithChildren, useRef} from "react";
import classNames from "classnames";
import {ConditionShow} from "../ConditionShow";
import {Icon, IconType} from "../icon/Icon";
import "./AppFooter.less";

type AppFooterProps = {
    className?: string;
    submenu?: React.ReactNode;
    showSubmenu?: boolean;
    onSubmenuCloseClick?: () => void;
} & PropsWithChildren;

export const AppFooter: React.FC<AppFooterProps> = (props: AppFooterProps) => {
    const {children, submenu, showSubmenu = false, className, onSubmenuCloseClick} = props;
    const resultClassName = classNames("app-footer-container", className);
    const submenuMenuRef = useRef(null);

    return (
        <div className={resultClassName}>
            <div className="app-footer">{children}</div>

            <ConditionShow condition={!!submenu && showSubmenu}>
                <div className="footer-submenu" ref={submenuMenuRef}>
                    {submenu}
                    <ConditionShow condition={!!onSubmenuCloseClick}>
                        <button className="close-submenu" onClick={onSubmenuCloseClick}><Icon type={IconType.CLOSE}/></button>
                    </ConditionShow>
                </div>
            </ConditionShow>
        </div>
    );
}