import React, {ChangeEvent} from "react";
import {Field, FieldProps} from "formik";
import * as Yup from 'yup';
import {InputField} from "app/components/form/InputField";
import {FieldMessage} from "app/components/form/FieldMessage";

type EmailFieldProps = {
    onEmailChange: (value: string) => void;
};

export const EMAIL_VALIDATION_SCHEMA = {
    emailId: Yup.string().required("Email is required").email("Invalid email")
}

export const EmailField: React.FC<EmailFieldProps> = (props: EmailFieldProps) => {

    return (
        <Field name="emailId">
            {({field: {onChange, ...other}, meta: {touched, error}}: FieldProps) => {
                const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
                    onChange(event);
                    props.onEmailChange(event.target.value)
                }

                return (
                    <>
                        <InputField
                            {...other}
                            invalid={touched && !!error}
                            placeholder="input your email"
                            onChange={onEmailChange}/>
                        <FieldMessage isError={true} visible={touched && !!error}>{error}</FieldMessage>
                    </>
                );
            }}
        </Field>
    );
}
