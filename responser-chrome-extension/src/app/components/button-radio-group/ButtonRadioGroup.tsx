import React, {ReactElement} from "react";
import classNames from "classnames";
import {Button} from "../button/Button";
import "./ButtonRadioGroup.less";

export type ButtonRadioGroupOption<T> = {
    value: T,
    label: string;
    disabled?: boolean;
}

type ButtonRadioGroup<T> = {
    options: ButtonRadioGroupOption<T>[];
    currentValue?: T;
    onChange?: (value: T) => void;
    className?: string;
    disabled?: boolean;
}
export const ButtonRadioGroup = <T extends any>(props: ButtonRadioGroup<T>): ReactElement => {
    const {options, currentValue, onChange, className, disabled} = props;

    const onButtonClick = (value: T) => {
        if (onChange && !disabled) {
            onChange(value);
        }
    }

    const getValuesButtons = () => {
        return options.map((option, index) => (
            <Button key={index}
                    outlined={option.value !== currentValue}
                    disabled={disabled || option.disabled}
                    onClick={() => onButtonClick(option.value)}>
                {option.label}
            </Button>
        ));
    }

    const resultClassName = classNames("button-radio-group", className);

    return (
        <div className={resultClassName}>
            {getValuesButtons()}
        </div>
    );
}
