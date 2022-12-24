import React, {ReactElement} from "react";
import classNames from "classnames";
import {Button} from "../button/Button";
import "./ButtonRadioGroup.less";

export type ButtonRadioGroupValue<T> = {
    value: T,
    label: string;
}

type ButtonRadioGroup<T> = {
    values: ButtonRadioGroupValue<T>[];
    currentValue?: T;
    onChange?: (value: T) => void;
    className?: string;
    disabled?: boolean;
}
export const ButtonRadioGroup = <T extends any>(props: ButtonRadioGroup<T>): ReactElement => {
    const {values, currentValue, onChange, className, disabled} = props;

    const onButtonClick = (value: T) => {
        if (onChange && !disabled) {
            onChange(value);
        }
    }

    const getValuesButtons = () => {
        return values.map((value, index) => (
            <Button key={index}
                    outlined={value.value !== currentValue}
                    disabled={disabled}
                    onClick={() => onButtonClick(value.value)}>
                {value.label}
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
