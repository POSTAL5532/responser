import React, {ChangeEvent} from "react";
import {Field, FieldProps} from "formik";
import {InputField, InputFieldProps} from "app/components/form/input-field/InputField";

export const FullNameField: React.FC<InputFieldProps> = (props: InputFieldProps) => {

    return (
        <Field name="fullName">
            {({field: {onChange, ...other}, meta: {touched, error}}: FieldProps) => {
                const onFullNameFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
                    onChange(event);
                    props.onChange(event)
                }

                return (
                    <InputField
                        {...other}
                        className={props.className}
                        placeholder={props.placeholder || "Full name"}
                        invalid={touched && !!error}
                        onChange={onFullNameFieldChange}
                        styleType={props.styleType}
                        message={(touched && !!error) && error}/>
                );
            }}
        </Field>
    );
}
