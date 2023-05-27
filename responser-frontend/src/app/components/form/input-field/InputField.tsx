import React from "react";
import classNames from "classnames";
import "./InputField.less";

type InputFieldProps = {
    invalid?: boolean;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const InputField: React.FC<InputFieldProps> = (props: InputFieldProps) => {
    const {className, invalid = false, disabled, ...otherProps} = props;
    const resultClassName = classNames("field", {"invalid": invalid}, {"disabled": disabled}, props.className);

    return (
        <input {...otherProps} disabled={disabled} className={resultClassName}/>
    );
}
