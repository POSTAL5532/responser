import React from "react";
import {FieldValidator, Form, Formik} from "formik";
import {FormikHelpers} from "formik/dist/types";
import * as Yup from "yup";
import {observer} from "mobx-react";
import {Button, ButtonType} from "../../../components/button/Button";
import {PASSWORD_VALIDATION_SCHEMA, PasswordField} from "../../../components/form/PasswordField";
import {UpdateUserPasswordPayload} from "../../../model/UpdateUserPasswordPayload";
import {Tooltip} from "../../../components/tooltip/Tooltip";
import "./EditPasswordForm.less";

type EditPasswordFormProps = {
    updateUserPasswordPayload: UpdateUserPasswordPayload;
    userUsesStubPassword: boolean,
    onFinish: (setFieldError?: (field: string, message: string) => void) => void;
    passwordsFilled: boolean;
    isLoading?: boolean;
}

const EditPasswordForm: React.FC<EditPasswordFormProps> = (props: EditPasswordFormProps) => {
    const {
        updateUserPasswordPayload,
        userUsesStubPassword,
        onFinish,
        isLoading,
        passwordsFilled
    } = props;

    const passwordEqualsValidator: FieldValidator = (value) => {
        return value === updateUserPasswordPayload.newPassword ? undefined : "Passwords isn't same";
    }

    const onSubmit = (values: any, {setFieldError}: FormikHelpers<any>) => {
        onFinish(setFieldError);
    }

    const EDIT_PASSWORD_FORM_VALIDATION_SCHEMA = Yup.object().shape({
        oldPassword: userUsesStubPassword ? Yup.string().notRequired() : Yup.string().required("Old is required"),
        newPassword: PASSWORD_VALIDATION_SCHEMA.password,
        confirmNewPassword: PASSWORD_VALIDATION_SCHEMA.password
    });

    return (
        <Formik initialValues={updateUserPasswordPayload}
                onSubmit={onSubmit}
                validationSchema={EDIT_PASSWORD_FORM_VALIDATION_SCHEMA}>
            <Form className="edit-password-form">
                <Tooltip show={userUsesStubPassword ? undefined : false} content="Just specify new password and confirm it.">
                    <PasswordField
                        label="Old password"
                        name="oldPassword"
                        placeholder="Old password"
                        onChange={event => updateUserPasswordPayload.oldPassword = event.target.value}
                        disabled={userUsesStubPassword || isLoading}/>
                </Tooltip>

                <PasswordField
                    label="New password"
                    name="newPassword"
                    placeholder="New password"
                    onChange={event => updateUserPasswordPayload.newPassword = event.target.value}
                    disabled={isLoading}/>

                <PasswordField
                    label="Confirm password"
                    name="confirmNewPassword"
                    placeholder="Confirm new password"
                    onChange={event => updateUserPasswordPayload.confirmNewPassword = event.target.value}
                    validator={passwordEqualsValidator}
                    disabled={isLoading}/>

                <Button
                    type="submit"
                    className="update-password-submit"
                    styleType={ButtonType.PRIMARY}
                    loading={isLoading}
                    disabled={isLoading || !passwordsFilled}>
                    Update password
                </Button>
            </Form>
        </Formik>
    );
}

export default observer(EditPasswordForm)
