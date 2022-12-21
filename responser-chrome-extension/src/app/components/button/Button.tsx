import React from "react";
import classNames from "classnames";
import "./Button.less";

type ButtonProps = {
    outlined?: boolean;
    active?: boolean;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    const {outlined, className, disabled, children, active, ...otherProps} = props;
    const resultClassName = classNames(
        "button",
        {
            "outlined": outlined,
            "disabled": disabled,
            "active": active
        },
        className
    );

    return (
        <button {...otherProps} className={resultClassName}>{children}</button>
    );
}
