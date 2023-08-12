import React, {ReactElement} from "react";
import classNames from "classnames";
import {RadioButton} from "../radio-button/RadioButton";
import "./RadioButtonGroup.less";

export type RadioButtonGroupOption<T> = {
    value: T,
    label: string;
    disabled?: boolean;
}

type RadioButtonGroupGroup<T> = {
    options: RadioButtonGroupOption<T>[];
    currentValue?: T;
    onChange?: (value: T) => void;
    className?: string;
    disabled?: boolean;
}
export const RadioButtonGroup = <T extends any>(props: RadioButtonGroupGroup<T>): ReactElement => {
    const {options, currentValue, onChange, className, disabled} = props;

    const onButtonClick = (value: T) => {
        if (onChange && !disabled) {
            onChange(value);
        }
    }

    const getValuesButtons = () => {
        return options.map((option, index) => (
            <RadioButton key={index}
                         onClick={() => onButtonClick(option.value)}
                         checked={option.value === currentValue}
                         disabled={disabled || option.disabled}
                         label={option.label}/>
        ));
    }

    const resultClassName = classNames("radio-group", className);

    return (
        <div className={resultClassName}>
            {getValuesButtons()}
        </div>
    );
}
