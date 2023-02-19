import React, {ChangeEvent} from "react";
import {Field, FieldProps} from "formik";
import * as Yup from 'yup';
import {InputField} from "app/components/form/input-field/InputField";
import {FieldMessage} from "app/components/form/field-message/FieldMessage";

type FullNameFieldProps = {
    onChange: (value: string) => void;
};

const FULL_NAME_SIZE_VALID_MESSAGE = "Full name must be from 2 to 255 characters";

export const FULL_NAME_VALIDATION_SCHEMA = {
    fullName: Yup.string()
        .required("Full name is required")
        .min(2, FULL_NAME_SIZE_VALID_MESSAGE)
        .max(255, FULL_NAME_SIZE_VALID_MESSAGE)
}

export const FullNameField: React.FC<FullNameFieldProps> = (props: FullNameFieldProps) => {

    return (
        <Field name="fullName">
            {({field: {onChange, ...other}, meta: {touched, error}}: FieldProps) => {
                const onFullNameFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
                    onChange(event);
                    props.onChange(event.target.value)
                }

                return (
                    <>
                        <InputField
                            {...other}
                            invalid={touched && !!error}
                            placeholder="Enter full name"
                            onChange={onFullNameFieldChange}/>
                        <FieldMessage isError={true} visible={touched && !!error}>{error}</FieldMessage>
                    </>
                );
            }}
        </Field>
    );
}
