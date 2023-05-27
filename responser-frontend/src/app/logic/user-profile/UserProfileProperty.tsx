import React from "react";
import classNames from "classnames";
import "./UserProfileProperty.less";

type UserProfilePropertyProps = {
    label: string;
    value: string | React.ReactNode;
    extra?: React.ReactNode;
    className?: string;
}

export const UserProfileProperty: React.FC<UserProfilePropertyProps> = (props: UserProfilePropertyProps) => {
    const {label, value, extra, className} = props;
    const resultClassName = classNames("user-property", className);

    return (
        <div className={resultClassName}>
            <div className="user-property-label">{label}{label ? ":" : null}</div>
            <div className="user-property-value">{value}</div>
            {!!extra && <div className="user-property-extra">{extra}</div>}
        </div>
    );
}
