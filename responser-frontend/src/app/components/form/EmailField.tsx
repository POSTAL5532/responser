import React, {ChangeEvent} from "react";
import {Field, FieldProps} from "formik";
import {InputField} from "app/components/form/input-field/InputField";
import {FieldMessage} from "app/components/form/field-message/FieldMessage";

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
                    <>
                        <InputField
                            {...other}
                            invalid={touched && !!error}
                            placeholder="Enter email"
                            onChange={onEmailChange}
                            disabled={props.disabled}/>
                        <FieldMessage isError={true} visible={touched && !!error}>{error}</FieldMessage>
                    </>
                );
            }}
        </Field>
    );
}
