import React, {ChangeEvent} from "react";
import {Field, FieldProps} from "formik";
import {InputField, InputFieldProps} from "app/components/form/input-field/InputField";

export const EmailField: React.FC<InputFieldProps> = (props: InputFieldProps) => {
    return (
        <Field name="email">
            {({field: {onChange, ...other}, meta: {touched, error}}: FieldProps) => {
                const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
                    onChange(event);
                    props.onChange(event)
                }

                return (
                    <InputField
                        {...other}
                        className={props.className}
                        placeholder={props.placeholder || "Email"}
                        invalid={touched && !!error}
                        onChange={onEmailChange}
                        styleType={props.styleType}
                        message={(touched && !!error) && error}/>
                );
            }}
        </Field>
    );
}
