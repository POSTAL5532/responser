import React from "react";
import classNames from "classnames";
import "./Button.less";

export enum ButtonType {
    PRIMARY = "PRIMARY",
    SECONDARY = "SECONDARY",
}

type ButtonProps = {
    styleType?: ButtonType;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    const {
        className,
        disabled,
        children,
        styleType = ButtonType.PRIMARY,
        ...otherProps
    } = props;

    const resultClassName = classNames(
        "button",
        styleType.toLowerCase(),
        {"disabled": disabled},
        className
    );

    return (
        <button {...otherProps} className={resultClassName} disabled={disabled}>
            {children}
        </button>
    );
}
