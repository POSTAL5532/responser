import React from "react";
import classNames from "classnames";
import "./BlurPanel.less";

type BlurPanelProps = {
    active?: boolean;
    className?: string;
}

export const BlurPanel: React.FC<BlurPanelProps> = (props: BlurPanelProps) => {
    const {active, className = false} = props;

    return <div className={classNames("blur-panel", {"active": active}, className)}></div>;
}
