import React, {ChangeEvent} from "react";
import {Field, FieldProps} from "formik";
import {InputField} from "app/components/form/input-field/InputField";

type UsernameFieldFieldProps = {
    onChange: (value: string) => void;
    disabled?: boolean;
};

export const UsernameField: React.FC<UsernameFieldFieldProps> = (props: UsernameFieldFieldProps) => {

    return (
        <Field name="userName">
            {({field: {onChange, ...other}, meta: {touched, error}}: FieldProps) => {
                const onUsernameFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
                    onChange(event);
                    props.onChange(event.target.value)
                }

                return (
                    <InputField
                        {...other}
                        label="Username"
                        invalid={touched && !!error}
                        onChange={onUsernameFieldChange}
                        disabled={props.disabled}
                        message={(touched && !!error) && error}/>
                );
            }}
        </Field>
    );
}
