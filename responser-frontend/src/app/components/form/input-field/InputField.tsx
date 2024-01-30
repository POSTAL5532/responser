import React from "react";
import classNames from "classnames";
import {ConditionShow} from "../../ConditionShow";
import "./InputField.less";

export enum InputFieldStyleType {
    SECONDARY = "secondary"
}

export type InputFieldProps = {
    invalid?: boolean;
    message?: string;
    styleType?: InputFieldStyleType;
    leftExtraComponent?: React.ReactNode;
    rightExtraComponent?: React.ReactNode;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const InputField: React.FC<InputFieldProps> = (props: InputFieldProps) => {
    const {
        className,
        invalid = false,
        disabled,
        message,
        value,
        leftExtraComponent,
        rightExtraComponent,
        styleType,
        ...otherProps
    } = props;

    const resultFieldContainerClassName = classNames(
        "field-container",
        {"invalid": invalid},
        {"disabled": disabled},
        {"with-message": !!message},
        {"with-left-extra": !!leftExtraComponent},
        {"with-right-extra": !!rightExtraComponent},
        styleType,
        className
    );

    return (
        <div className={resultFieldContainerClassName}>
            <div className="field">
                <ConditionShow condition={!!leftExtraComponent}>
                    <div className="extra-component left">{leftExtraComponent}</div>
                </ConditionShow>

                <input {...otherProps} disabled={disabled} value={value}/>

                <ConditionShow condition={!!rightExtraComponent}>
                    <div className="extra-component right">{rightExtraComponent}</div>
                </ConditionShow>
            </div>

            <ConditionShow condition={!!message}>
                <span className="message">{message}</span>
            </ConditionShow>
        </div>
    );
}
