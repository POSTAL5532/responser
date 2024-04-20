import React from "react";
import classNames from "classnames";
import {ConditionShow} from "../../ConditionShow";
import "./TextArea.less";

export enum TextAreaStyleType {
    SECONDARY = "secondary"
}

export type TextAreaProps = {
    invalid?: boolean;
    message?: string;
    styleType?: TextAreaStyleType;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export const TextArea: React.FC<TextAreaProps> = (props: TextAreaProps) => {
    const {
        className,
        invalid = false,
        disabled,
        message,
        styleType,
        ...otherProps
    } = props;

    const resultFieldContainerClassName = classNames(
        "text-area-container",
        {"invalid": invalid},
        {"disabled": disabled},
        {"with-message": !!message},
        styleType,
        className
    );

    return (
        <div className={resultFieldContainerClassName}>
            <div className="text-area">
                <textarea {...otherProps} disabled={disabled}/>
            </div>

            <ConditionShow condition={!!message}>
                <span className="message">{message}</span>
            </ConditionShow>
        </div>
    );
}