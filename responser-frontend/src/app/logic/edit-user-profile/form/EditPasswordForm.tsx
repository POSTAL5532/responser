import React from "react";
import {FieldValidator, Form, Formik} from "formik";
import {FormikHelpers} from "formik/dist/types";
import * as Yup from "yup";
import {observer} from "mobx-react";
import {Button} from "../../../components/button/Button";
import {PASSWORD_VALIDATION_SCHEMA, PasswordField} from "../../../components/form/PasswordField";
import {UpdateUserPasswordPayload} from "../../../model/UpdateUserPasswordPayload";
import "./EditPasswordForm.less";

type EditPasswordFormProps = {
    updateUserPasswordPayload: UpdateUserPasswordPayload;
    onFinish: (setFieldError?: (field: string, message: string) => void) => void;
    passwordsFilled: boolean;
    disabled?: boolean;
}

const EDIT_PASSWORD_FORM_VALIDATION_SCHEMA = Yup.object().shape({
    oldPassword: Yup.string().required("Old is required"),
    newPassword: PASSWORD_VALIDATION_SCHEMA.password,
    confirmNewPassword: PASSWORD_VALIDATION_SCHEMA.password
});

const EditPasswordForm: React.FC<EditPasswordFormProps> = (props: EditPasswordFormProps) => {
    const {updateUserPasswordPayload, onFinish, disabled, passwordsFilled} = props;

    const passwordEqualsValidator: FieldValidator = (value) => {
        return value === updateUserPasswordPayload.newPassword ? undefined : "Passwords isn't same";
    }

    const onSubmit = (values: any, {setFieldError}: FormikHelpers<any>) => {
        onFinish(setFieldError);
    }

    return (
        <div className="edit-password-form">
            <Formik initialValues={updateUserPasswordPayload}
                    onSubmit={onSubmit}
                    validationSchema={EDIT_PASSWORD_FORM_VALIDATION_SCHEMA}>
                <Form>
                    {/*<PasswordField name="oldPassword"
                                   placeholder="Old password"
                                   onChange={value => updateUserPasswordPayload.oldPassword = value}
                                   disabled={disabled}/>

                    <PasswordField name="newPassword"
                                   placeholder="New password"
                                   onChange={value => updateUserPasswordPayload.newPassword = value}
                                   disabled={disabled}/>

                    <PasswordField name="confirmNewPassword"
                                   placeholder="Confirm new password"
                                   onChange={value => updateUserPasswordPayload.confirmNewPassword = value}
                                   validator={passwordEqualsValidator}
                                   disabled={disabled}/>

                    <div className="form-controls">
                        <Button type="submit" loading={disabled} disabled={disabled || !passwordsFilled}>Update password</Button>
                    </div>*/}
                </Form>
            </Formik>
        </div>
    );
}

export default observer(EditPasswordForm)
