import React, {ChangeEvent} from "react";
import {Field, FieldProps} from "formik";
import {InputField, InputFieldProps} from "app/components/form/input-field/InputField";

export const UsernameField: React.FC<InputFieldProps> = (props: InputFieldProps) => {

    return (
        <Field name="userName">
            {({field: {onChange, ...other}, meta: {touched, error}}: FieldProps) => {
                const onUsernameFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
                    onChange(event);
                    props.onChange(event)
                }

                return (
                    <InputField
                        {...other}
                        className={props.className}
                        placeholder={props.placeholder || "Username"}
                        invalid={touched && !!error}
                        onChange={onUsernameFieldChange}
                        styleType={props.styleType}
                        message={(touched && !!error) && error}/>
                );
            }}
        </Field>
    );
}
