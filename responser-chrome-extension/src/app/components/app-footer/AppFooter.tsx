import React, {PropsWithChildren, useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {ConditionShow} from "../ConditionShow";
import "./AppFooter.less";

type AppFooterProps = {
    className?: string;
    submenu?: React.ReactNode;
    showSubmenu?: boolean;
} & PropsWithChildren;

export const AppFooter: React.FC<AppFooterProps> = (props: AppFooterProps) => {
    const {children, submenu, showSubmenu = false, className} = props;
    const resultClassName = classNames("app-footer-container", className);
    const [submenuContainerHeight, setSubmenuContainerHeight] = useState<number>(0);
    const submenuMenuRef = useRef(null);

    useEffect(() => {
        if (showSubmenu) {
            setSubmenuContainerHeight(submenuMenuRef.current.clientHeight);
        } else {
            setSubmenuContainerHeight(0);
        }
    }, [showSubmenu]);

    return (
        <div className={resultClassName}>
            <div className="app-footer">{children}</div>

            <ConditionShow condition={!!submenu}>
                <div className="footer-submenu-container" style={{height: submenuContainerHeight + 10}}>
                    <div className="footer-submenu" ref={submenuMenuRef}>{submenu}</div>
                </div>
            </ConditionShow>
        </div>
    );
}