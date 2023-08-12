import React, {ChangeEvent} from "react";
import {Field, FieldProps} from "formik";
import {InputField} from "app/components/form/input-field/InputField";

type FullNameFieldProps = {
    onChange: (value: string) => void;
    disabled?: boolean;
};

export const FullNameField: React.FC<FullNameFieldProps> = (props: FullNameFieldProps) => {

    return (
        <Field name="fullName">
            {({field: {onChange, ...other}, meta: {touched, error}}: FieldProps) => {
                const onFullNameFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
                    onChange(event);
                    props.onChange(event.target.value)
                }

                return (
                    <InputField
                        {...other}
                        label="Full name"
                        invalid={touched && !!error}
                        onChange={onFullNameFieldChange}
                        disabled={props.disabled}
                        message={(touched && !!error) && error}/>
                );
            }}
        </Field>
    );
}
