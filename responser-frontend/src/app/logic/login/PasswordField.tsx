import React, {ChangeEvent} from "react";
import {Field, FieldProps} from "formik";
import * as Yup from 'yup';
import {InputField} from "app/components/form/InputField";
import {FieldMessage} from "app/components/form/FieldMessage";

type PasswordFieldProps = {
    onPasswordChange: (value: string) => void;
};

export const LOGIN_PASSWORD_VALIDATION_SCHEMA = {
    password: Yup.string().required("Password is required")
}

export const PasswordField: React.FC<PasswordFieldProps> = (props: PasswordFieldProps) => {

    return (
        <Field name="password">
            {({field: {onChange, ...other}, meta: {touched, error}}: FieldProps) => {
                const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
                    onChange(event);
                    props.onPasswordChange(event.target.value)
                }

                return (
                    <>
                        <InputField
                            {...other}
                            type="password"
                            invalid={touched && !!error}
                            placeholder="input your password"
                            onChange={onPasswordChange}/>
                        <FieldMessage isError={true} visible={touched && !!error}>{error}</FieldMessage>
                    </>
                );
            }}
        </Field>
    );
}
