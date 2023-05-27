import React, {ChangeEvent} from "react";
import {Field, FieldProps} from "formik";
import {InputField} from "app/components/form/input-field/InputField";
import {FieldMessage} from "app/components/form/field-message/FieldMessage";

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
                    <>
                        <InputField
                            {...other}
                            invalid={touched && !!error}
                            placeholder="Enter username"
                            onChange={onUsernameFieldChange}
                            disabled={props.disabled}/>
                        <FieldMessage isError={true} visible={touched && !!error}>{error}</FieldMessage>
                    </>
                );
            }}
        </Field>
    );
}
