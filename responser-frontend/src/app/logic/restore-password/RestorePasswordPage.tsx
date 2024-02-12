import React, {useState} from "react";
import {useParams} from "react-router";
import {observer} from "mobx-react";
import {FieldValidator, Form, Formik} from "formik";
import * as Yup from "yup";
import {FormikHelpers} from "formik/dist/types";
import Page from "../../components/page/Page";
import {useRestorePasswordPageStore} from "./RestorePasswordPageStore";
import {Button, ButtonType} from "../../components/button/Button";
import {PASSWORD_VALIDATION_SCHEMA, PasswordField} from "../../components/form/PasswordField";
import {PageName} from "../../components/page-name/PageName";
import Modal from "../../components/modal/Modal";
import AuthorizationService from "../../service/authorization/AuthorizationService";
import "./RestorePasswordPage.less"

export const RESTORE_PASSWORD_PAGE_URL = "/restore-password/:restorePasswordId";

const RESTORE_PASSWORD_FORM_VALIDATION_SCHEMA = Yup.object().shape({
    newPassword: PASSWORD_VALIDATION_SCHEMA.password,
    confirmNewPassword: PASSWORD_VALIDATION_SCHEMA.password
});

type RestorePasswordPagePathParameter = {
    restorePasswordId: string;
}

const RestorePasswordPage: React.FC = () => {
    const {restorePasswordId} = useParams<RestorePasswordPagePathParameter>();
    const [passwordRestored, setPasswordRestored] = useState(false);
    const {
        restorePasswordPayload,
        loadingState: {isDataSubmitting},
        passwordsFilled,
        restorePassword
    } = useRestorePasswordPageStore(restorePasswordId);

    const passwordEqualsValidator: FieldValidator = (value) => {
        return value === restorePasswordPayload.newPassword ? undefined : "Passwords isn't same";
    }

    const onSubmit = (values: any, {setFieldError}: FormikHelpers<any>) => {
        restorePassword(setFieldError).then(result => setPasswordRestored(result));
    }

    return (
        <Page tabTitle="Restore password" className="restore-password-page">
            <section className="section">
                <PageName>Restore password</PageName>
                <h2 className="restore-password-description">Install new password a nd sign in.</h2>

                <div className="restore-password-form">
                    <Formik initialValues={restorePasswordPayload}
                            onSubmit={onSubmit}
                            validationSchema={RESTORE_PASSWORD_FORM_VALIDATION_SCHEMA}>
                        <Form>
                            <PasswordField name="newPassword"
                                           placeholder="New password"
                                           onChange={({target}) => restorePasswordPayload.newPassword = target.value}
                                           disabled={isDataSubmitting}/>

                            <PasswordField name="confirmNewPassword"
                                           placeholder="Confirm new password"
                                           onChange={({target}) => restorePasswordPayload.confirmNewPassword = target.value}
                                           validator={passwordEqualsValidator}
                                           disabled={isDataSubmitting}/>

                            <Button type="submit" styleType={ButtonType.PRIMARY} loading={isDataSubmitting} disabled={isDataSubmitting || !passwordsFilled}>
                                Update password
                            </Button>
                        </Form>
                    </Formik>
                </div>
            </section>

            <Modal isOpen={passwordRestored} onClose={() => AuthorizationService.requestLoginPage()} className="password-changed-modal">
                <Modal.Body>
                    <p className="text">
                        Your password was changed. Now you can login with your new password.
                    </p>

                    <Button styleType={ButtonType.PRIMARY} onClick={() => AuthorizationService.requestLoginPage()}>Ok</Button>
                </Modal.Body>
            </Modal>
        </Page>
    );
}

export default observer(RestorePasswordPage);
