import React from "react";
import classNames from "classnames";
import "./Button.less";

export enum ButtonType {
    PRIMARY = "PRIMARY",
    SECONDARY = "SECONDARY",
}

export enum ButtonSize {
    SMALL = "small"
}

type ButtonProps = {
    styleType?: ButtonType;
    size?: ButtonSize;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    const {
        className,
        disabled,
        children,
        styleType = ButtonType.PRIMARY,
        size,
        ...otherProps
    } = props;

    const resultClassName = classNames(
        "button",
        styleType.toLowerCase(),
        {"disabled": disabled},
        size,
        className
    );

    return (
        <button {...otherProps} className={resultClassName} disabled={disabled}>
            {children}
        </button>
    );
}
