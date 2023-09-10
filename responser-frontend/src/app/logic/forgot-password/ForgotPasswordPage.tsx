import React, {useState} from "react";
import Page from "../../components/page/Page";
import {Form, Formik} from "formik";
import {EmailField} from "../../components/form/EmailField";
import {Button} from "../../components/button/Button";
import {useForgotPasswordPageStore} from "./ForgotPasswordPageStore";
import * as Yup from "yup";
import {EMAIL_VALIDATION_SCHEMA} from "../../utils/ValidationUtils";
import {nativeNavigateTo} from "../../utils/NavigationUtils";
import {Modal} from "../../components/modal/Modal";
import ApplicationProperties from "../../service/ApplicationProperties";
import {observer} from "mobx-react";
import {FormikHelpers} from "formik/dist/types";

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
        <Page tabTitle="Restore password">
            <h2 className="restore-password">Restore password</h2>

            <div className="restore-password-form">
                <Formik initialValues={forgotPasswordPayload} onSubmit={onSubmit} validationSchema={RESTORE_PASSWORD_VALIDATION_SCHEMA}>
                    <Form>
                        <EmailField onChange={value => forgotPasswordPayload.email = value} disabled={isDataSubmitting}/>

                        <div className="form-controls">
                            <Button type="submit" loading={isDataSubmitting} disabled={isDataSubmitting}>Restore</Button>
                        </div>
                    </Form>
                </Formik>
            </div>

            <Modal isOpen={passwordRestoreLinkSent} header="Done" onOk={() => nativeNavigateTo(ApplicationProperties.unauthorizedPageUrl)}>
                We sent password restore link to your email.
            </Modal>
        </Page>
    );
}

export default observer(ForgotPasswordPage);
