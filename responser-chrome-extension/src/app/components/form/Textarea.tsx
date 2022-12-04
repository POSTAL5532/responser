import React from "react";
import classNames from "classnames";
import "./Textarea.less";

type TextareaProps = {
    invalid?: boolean;
    resizable?: boolean;
} & React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export const Textarea: React.FC<TextareaProps> = (props: TextareaProps) => {
    const {className, invalid = false, resizable, ...otherProps} = props;
    const resultClassName = classNames("textarea", {"invalid": invalid, "resizable": resizable}, props.className);

    return (
        <textarea {...otherProps} className={resultClassName}/>
    );
}