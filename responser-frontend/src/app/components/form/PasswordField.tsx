import React, {ChangeEvent} from "react";
import {Field, FieldProps, FieldValidator} from "formik";
import * as Yup from 'yup';
import {InputField} from "app/components/form/input-field/InputField";

type PasswordFieldProps = {
    onChange: (value: string) => void;
    name: string;
    label: string;
    validator?: FieldValidator;
    disabled?: boolean;
};

export const PASSWORD_VALIDATION_SCHEMA = {
    password: Yup.string()
    .required("Password is required")
    .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must contains minimum eight characters, at least one letter and one number"
    )
}

export const PasswordField: React.FC<PasswordFieldProps> = (props: PasswordFieldProps) => {

    return (
        <Field name={props.name} validate={props.validator}>
            {({field: {onChange, ...other}, meta: {touched, error}}: FieldProps) => {
                const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
                    onChange(event);
                    props.onChange(event.target.value)
                }

                return (
                    <InputField
                        {...other}
                        type="password"
                        invalid={touched && !!error}
                        label={props.label}
                        onChange={onPasswordChange}
                        disabled={props.disabled}
                        message={(touched && !!error) && error}/>
                );
            }}
        </Field>
    );
}
