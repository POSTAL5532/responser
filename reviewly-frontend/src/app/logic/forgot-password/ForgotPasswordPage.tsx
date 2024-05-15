import React, {useState} from "react";
import {observer} from "mobx-react";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {FormikHelpers} from "formik/dist/types";
import Page from "../../components/page/Page";
import {EmailField} from "../../components/form/EmailField";
import {Button, ButtonType} from "../../components/button/Button";
import {useForgotPasswordPageStore} from "./ForgotPasswordPageStore";
import {EMAIL_VALIDATION_SCHEMA} from "../../utils/ValidationUtils";
import {nativeNavigateTo} from "../../utils/NavigationUtils";
import ApplicationProperties from "../../service/ApplicationProperties";
import {PageName} from "../../components/page-name/PageName";
import {InputFieldStyleType} from "../../components/form/input-field/InputField";
import Modal from "../../components/modal/Modal";
import "./ForgotPasswordPage.less";

export const FORGOT_PASSWORD_PAGE_URL = "/forgot-password";

const RESTORE_PASSWORD_VALIDATION_SCHEMA = Yup.object().shape({
    ...EMAIL_VALIDATION_SCHEMA
});

const ForgotPasswordPage: React.FC = () => {

    const {forgotPasswordPayload, loadingState: {isDataSubmitting}, sendRestorePasswordLink} = useForgotPasswordPageStore();
    const [passwordRestoreLinkSent, setPasswordRestoreLinkSent] = useState(false);

    const onSubmit = (values: any, {setFieldError}: FormikHelpers<any>) => {
        sendRestorePasswordLink(setFieldError).then(result => setPasswordRestoreLinkSent(result));
    }

    return (
        <Page tabTitle="Restore password" className="forgot-password-page">
            <section className="section">
                <PageName>Restore password</PageName>
                <h2 className="restore-password-description">Restore your account access by email.</h2>

                <div className="forgot-password-form">
                    <Formik initialValues={forgotPasswordPayload} onSubmit={onSubmit} validationSchema={RESTORE_PASSWORD_VALIDATION_SCHEMA}>
                        <Form>
                            <EmailField styleType={InputFieldStyleType.SECONDARY}
                                        onChange={({target}) => forgotPasswordPayload.email = target.value}
                                        disabled={isDataSubmitting}/>

                            <Button type="submit" styleType={ButtonType.PRIMARY} loading={isDataSubmitting} disabled={isDataSubmitting}>Restore</Button>
                        </Form>
                    </Formik>
                </div>
            </section>

            <Modal isOpen={passwordRestoreLinkSent} onClose={() => nativeNavigateTo(ApplicationProperties.selfHost)} className="restore-sent-modal">
                <Modal.Body>
                    <p className="text">
                        We sent password restore link to your email. Restore password by link and retry the login.
                    </p>

                    <Button styleType={ButtonType.PRIMARY} onClick={() => nativeNavigateTo(ApplicationProperties.selfHost)}>Ok</Button>
                </Modal.Body>
            </Modal>
        </Page>
    );
}

export default observer(ForgotPasswordPage);
