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
            "disabled": disabled
        },
        className
    );

    // TODO: Redundant?
    /*const onButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (!disabled) onClick(event);
    }*/

    return (
        <button {...otherProps} className={resultClassName} disabled={disabled}>{children}</button>
    );
}
