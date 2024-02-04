import React, {useState} from "react";
import Page from "../../components/page/Page";
import {Form, Formik} from "formik";
import {EmailField} from "../../components/form/EmailField";
import {Button, ButtonType} from "../../components/button/Button";
import {useForgotPasswordPageStore} from "./ForgotPasswordPageStore";
import * as Yup from "yup";
import {EMAIL_VALIDATION_SCHEMA} from "../../utils/ValidationUtils";
import {nativeNavigateTo} from "../../utils/NavigationUtils";
//import {Modal} from "../../components/modal/Modal";
import ApplicationProperties from "../../service/ApplicationProperties";
import {observer} from "mobx-react";
import {FormikHelpers} from "formik/dist/types";
import {PageName} from "../../components/page-name/PageName";
import "./ForgotPasswordPage.less";
import {InputFieldStyleType} from "../../components/form/input-field/InputField";

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

            {/*<Modal isOpen={passwordRestoreLinkSent} header="Done" onOk={() => nativeNavigateTo(ApplicationProperties.unauthorizedPageUrl)}>
                We sent password restore link to your email.
            </Modal>*/}
        </Page>
    );
}

export default observer(ForgotPasswordPage);
