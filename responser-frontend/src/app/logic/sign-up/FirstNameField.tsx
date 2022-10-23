import React, {ChangeEvent} from "react";
import {Field, FieldProps} from "formik";
import * as Yup from 'yup';
import {InputField} from "app/components/form/InputField";
import {FieldMessage} from "app/components/form/FieldMessage";

type FirstNameFieldFieldProps = {
    onFirstNameFieldChange: (value: string) => void;
};

const FIRST_NAME_SIZE_VALID_MESSAGE = "First name must be from 2 to 255 characters";

export const FIRST_NAME_VALIDATION_SCHEMA = {
    firstName: Yup.string()
        .required("First name is required")
        .min(2, FIRST_NAME_SIZE_VALID_MESSAGE)
        .max(255, FIRST_NAME_SIZE_VALID_MESSAGE)
}

export const FirstNameField: React.FC<FirstNameFieldFieldProps> = (props: FirstNameFieldFieldProps) => {

    return (
        <Field name="firstName">
            {({field: {onChange, ...other}, meta: {touched, error}}: FieldProps) => {
                const onFirstNameFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
                    onChange(event);
                    props.onFirstNameFieldChange(event.target.value)
                }

                return (
                    <>
                        <InputField
                            {...other}
                            invalid={touched && !!error}
                            placeholder="input your first name"
                            onChange={onFirstNameFieldChange}/>
                        <FieldMessage isError={true} visible={touched && !!error}>{error}</FieldMessage>
                    </>
                );
            }}
        </Field>
    );
}
