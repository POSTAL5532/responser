import React, {PropsWithChildren, ReactNode} from "react";
import {ConditionShow} from "../ConditionShow";
import {Icon, IconType} from "../icon/Icon";
import classNames from "classnames";
import "./AppHeader.less";

type AppHeaderProps = {
    headerLabel?: ReactNode;
    controls?: ReactNode;
    className?: string;
} & PropsWithChildren;

export const AppHeader: React.FC<AppHeaderProps> = (props: AppHeaderProps) => {
    const {headerLabel = "Reviewly", className, children, controls} = props;
    const resultClassName = classNames("header", {"with-additional-content": !!children}, className);

    return (
        <header className={resultClassName}>
            <div className="main-content">
                <div className="icon-container">
                    <Icon type={IconType.REVIEWLY}/>
                </div>

                {!!headerLabel && <div className="header-label">{headerLabel}</div>}

                <div className="controls">
                    {!!controls && controls}
                </div>
            </div>

            <ConditionShow condition={!!children}>
                <div className="additional-content">
                    {children}
                </div>
            </ConditionShow>
        </header>
    );
}
