import React, {ChangeEvent} from "react";
import {Field, FieldProps} from "formik";
import {InputField} from "app/components/form/input-field/InputField";

type EmailFieldProps = {
    onChange: (value: string) => void;
    disabled?: boolean;
};

export const EmailField: React.FC<EmailFieldProps> = (props: EmailFieldProps) => {
    return (
        <Field name="email">
            {({field: {onChange, ...other}, meta: {touched, error}}: FieldProps) => {
                const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
                    onChange(event);
                    props.onChange(event.target.value)
                }

                return (
                    <InputField
                        {...other}
                        label="Email"
                        invalid={touched && !!error}
                        onChange={onEmailChange}
                        disabled={props.disabled}
                        message={(touched && !!error) && error}/>
                );
            }}
        </Field>
    );
}
