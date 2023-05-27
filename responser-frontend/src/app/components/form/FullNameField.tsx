import React, {ChangeEvent} from "react";
import {Field, FieldProps} from "formik";
import {InputField} from "app/components/form/input-field/InputField";
import {FieldMessage} from "app/components/form/field-message/FieldMessage";

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
                    <>
                        <InputField
                            {...other}
                            invalid={touched && !!error}
                            placeholder="Enter full name"
                            onChange={onFullNameFieldChange}
                            disabled={props.disabled}/>
                        <FieldMessage isError={true} visible={touched && !!error}>{error}</FieldMessage>
                    </>
                );
            }}
        </Field>
    );
}
