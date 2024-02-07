import React, {ForwardedRef} from "react";
import classNames from "classnames";
import {Spinner} from "../spinner/Spinner";
import "./Button.less";

export enum ButtonType {
    PRIMARY = "primary",
    LIGHT = "light",
    DEFAULT = "default"
}

export enum ButtonSize {
    SMALL = "small"
}

type ButtonProps = {
    styleType?: ButtonType;
    size?: ButtonSize;
    loading?: boolean;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
        className,
        disabled,
        children,
        styleType ,
        size,
        loading,
        type,
        ...otherProps
    } = props;

    const resultClassName = classNames("button", styleType, {"disabled": disabled}, size, className);

    return (
        <button {...otherProps} type={type || "button"} className={resultClassName} disabled={disabled} ref={ref}>
            {loading ? <Spinner/> : children}
        </button>
    );
});
