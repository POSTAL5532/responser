import React, {ChangeEvent, useState} from "react";
import {Field, FieldProps, FieldValidator} from "formik";
import * as Yup from 'yup';
import {InputField, InputFieldProps} from "app/components/form/input-field/InputField";
import {Button} from "../button/Button";
import {Icon, IconType} from "../icon/Icon";
import classNames from "classnames";
import "./PasswordField.less";

type PasswordFieldProps = {
    validator?: FieldValidator;
} & InputFieldProps;

export const PASSWORD_VALIDATION_SCHEMA = {
    password: Yup.string()
    .required("Password is required")
    .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must contains minimum eight characters, at least one letter and one number"
    )
}

export const PasswordField: React.FC<PasswordFieldProps> = (props: PasswordFieldProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <Field name={props.name} validate={props.validator}>
            {({field: {onChange, ...other}, meta: {touched, error}}: FieldProps) => {
                const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
                    onChange(event);
                    props.onChange(event)
                }

                return (
                    <InputField
                        {...other}
                        className={classNames("password", props.className)}
                        type={showPassword ? "text" : "password"}
                        invalid={touched && !!error}
                        placeholder={props.placeholder || "Password"}
                        onChange={onPasswordChange}
                        styleType={props.styleType}
                        message={(touched && !!error) && error}
                        rightExtraComponent={<Button className="show-password-button" onClick={() => setShowPassword(!showPassword)}><Icon type={IconType.EYE}/></Button>}/>
                );
            }}
        </Field>
    );
}
