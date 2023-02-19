import React, {ChangeEvent} from "react";
import {Field, FieldProps} from "formik";
import * as Yup from 'yup';
import {InputField} from "app/components/form/input-field/InputField";
import {FieldMessage} from "app/components/form/field-message/FieldMessage";

type LastNameFieldFieldProps = {
    onLastNameFieldChange: (value: string) => void;
};

const LAST_NAME_SIZE_VALID_MESSAGE = "Last name must be from 2 to 255 characters";

export const LAST_NAME_VALIDATION_SCHEMA = {
    lastName: Yup.string()
        .required("Last name is required")
        .min(2, LAST_NAME_SIZE_VALID_MESSAGE)
        .max(255, LAST_NAME_SIZE_VALID_MESSAGE)
}

export const LastNameField: React.FC<LastNameFieldFieldProps> = (props: LastNameFieldFieldProps) => {

    return (
        <Field name="lastName">
            {({field: {onChange, ...other}, meta: {touched, error}}: FieldProps) => {
                const onLastNameFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
                    onChange(event);
                    props.onLastNameFieldChange(event.target.value)
                }

                return (
                    <>
                        <InputField
                            {...other}
                            invalid={touched && !!error}
                            placeholder="input your last name"
                            onChange={onLastNameFieldChange}/>
                        <FieldMessage isError={true} visible={touched && !!error}>{error}</FieldMessage>
                    </>
                );
            }}
        </Field>
    );
}
