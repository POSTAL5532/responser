import React, {useState} from "react";
import classNames from "classnames";
import "./InputField.less";
import {ConditionShow} from "../../ConditionShow";

type InputFieldProps = {
    label?: string;
    invalid?: boolean;
    message?: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const InputField: React.FC<InputFieldProps> = (props: InputFieldProps) => {
    const {className, invalid = false, disabled, label, message, value, ...otherProps} = props;
    const [focused, setFocused] = useState(false);

    const resultFieldContainerClassName = classNames(
        "field-container",
        {"invalid": invalid},
        props.className
    );

    const resultFieldClassName = classNames(
        "field",
        {"disabled": disabled},
        {"focused": focused},
        {"with-label": !!label},
        {"with-message": !!message},
    );

    const setFocus = (focus: boolean) => {
        setFocused(focus);
    }

    return (
        <div className={resultFieldContainerClassName}>
            <div className={resultFieldClassName} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
                <input {...otherProps} disabled={disabled} value={value} placeholder=" "/>
                <span className="label">{label}</span>
            </div>

            <ConditionShow condition={!!message}>
                <span className="message">{message}</span>
            </ConditionShow>
        </div>
    );
}
