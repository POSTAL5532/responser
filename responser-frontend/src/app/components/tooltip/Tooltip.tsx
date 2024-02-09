import React, {PropsWithChildren, useState} from "react";
import classNames from "classnames";
import "./Tooltip.less"

export enum TooltipPosition {
    LEFT = "left",
    RIGHT = "right",
    TOP = "top",
    BOTTOM = "bottom",
}

type TooltipProps = {
    className?: string;
    position?: TooltipPosition;
    content?: React.ReactNode;
    show?: boolean;
}

export const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = (props: PropsWithChildren<TooltipProps>) => {
    const {children, className, position = TooltipPosition.RIGHT, content, show} = props;
    const [showState, setShowState] = useState<boolean>(false);

    const resultClassName = classNames(
        "tooltip-container",
        position,
        {"show": (show != false) && (showState || show)},
        className
    );

    return (
        <div className={resultClassName} onMouseOver={() => setShowState(true)} onMouseLeave={() => setShowState(false)}>
            {children}
            <div className="tooltip">{content}</div>
        </div>
    );
}