import React from "react";
import classNames from "classnames";
import "app/components/form/input-field/InputField.less";

type InputFieldProps = {
    invalid?: boolean;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const InputField: React.FC<InputFieldProps> = (props: InputFieldProps) => {
    const {className, invalid = false, ...otherProps} = props;
    const resultClassName = classNames("field", {"invalid": invalid}, props.className);

    return (
        <input {...otherProps} className={resultClassName}/>
    );
}
