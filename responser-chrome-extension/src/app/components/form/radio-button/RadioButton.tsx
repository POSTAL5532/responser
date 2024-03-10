import React from "react";
import classNames from "classnames";
import "./RadioButton.less";

type RadioButtonProps = {
    onClick?: () => void;
    checked?: boolean;
    label?: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

export const RadioButton: React.FC<RadioButtonProps> = (props: RadioButtonProps) => {
    const {onClick, checked = false, label, className, disabled = false} = props
    const resultClassName = classNames("radio-button", {"checked": checked, "disabled": disabled}, className);

    const onRadioButtonClick = () => {
        onClick?.();
    }

    return (
        <div className={resultClassName} onClick={onRadioButtonClick}>
            <div className="border">
                <div className="checked-indicator"></div>
            </div>
            {label ? <span className="label">{label}</span> : null}
        </div>
    );
}