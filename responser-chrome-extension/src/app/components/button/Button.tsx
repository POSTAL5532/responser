import React, {ForwardedRef} from "react";
import classNames from "classnames";
import {Spinner} from "../spinner/Spinner";
import "./Button.less";

export enum ButtonType {
    PRIMARY = "primary",
    LITE = "lite"
}

type ButtonProps = {
    styleType?: ButtonType;
    loading?: boolean;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
        className,
        disabled,
        children,
        styleType ,
        loading,
        type,
        ...otherProps
    } = props;

    const resultClassName = classNames("button", styleType, {"disabled": disabled}, className);

    return (
        <button {...otherProps} type={type || "button"} className={resultClassName} disabled={disabled} ref={ref}>
            {loading ? <Spinner/> : children}
        </button>
    );
});
