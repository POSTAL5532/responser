import React, {ChangeEvent} from "react";
import {Field, FieldProps} from "formik";
import * as Yup from 'yup';
import {InputField} from "app/components/form/InputField";
import {FieldMessage} from "app/components/form/FieldMessage";

type UsernameFieldFieldProps = {
    onUsernameFieldChange: (value: string) => void;
};

const USERNAME_SIZE_VALID_MESSAGE = "Username must be from 2 to 255 characters";

export const USERNAME_VALIDATION_SCHEMA = {
    userName: Yup.string()
        .required("Username name is required")
        .min(2, USERNAME_SIZE_VALID_MESSAGE)
        .max(255, USERNAME_SIZE_VALID_MESSAGE)
}

export const UsernameField: React.FC<UsernameFieldFieldProps> = (props: UsernameFieldFieldProps) => {

    return (
        <Field name="userName">
            {({field: {onChange, ...other}, meta: {touched, error}}: FieldProps) => {
                const onUsernameFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
                    onChange(event);
                    props.onUsernameFieldChange(event.target.value)
                }

                return (
                    <>
                        <InputField
                            {...other}
                            invalid={touched && !!error}
                            placeholder="input your username"
                            onChange={onUsernameFieldChange}/>
                        <FieldMessage isError={true} visible={touched && !!error}>{error}</FieldMessage>
                    </>
                );
            }}
        </Field>
    );
}
