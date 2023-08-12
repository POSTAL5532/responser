import React from "react";
import {observer} from "mobx-react";
import {FieldValidator, Form, Formik} from "formik";
import * as Yup from "yup";
import {UserAccountDataPayload} from "app/model/UserAccountDataPayload";
import {Button, ButtonType} from "app/components/button/Button";
import {PASSWORD_VALIDATION_SCHEMA, PasswordField} from "app/components/form/PasswordField";
import AuthorizationService from "../../../service/authorization/AuthorizationService";
import {FormikHelpers} from "formik/dist/types";
import {EMAIL_VALIDATION_SCHEMA, FULL_NAME_VALIDATION_SCHEMA, USERNAME_VALIDATION_SCHEMA} from "../../../utils/ValidationUtils";
import {EmailField} from "../../../components/form/EmailField";
import {UsernameField} from "../../../components/form/UsernameField";
import {FullNameField} from "../../../components/form/FullNameField";
import "./SignUpForm.less";
import {Link} from "../../../components/link/Link";

type SignUpFormProps = {
    signUpPayload: UserAccountDataPayload,
    onFinish: (setFieldError?: (field: string, message: string) => void) => void,
    disabled: boolean
}

const SIGNUP_FORM_VALIDATION_SCHEMA = Yup.object().shape({
    ...USERNAME_VALIDATION_SCHEMA,
    ...EMAIL_VALIDATION_SCHEMA,
    ...FULL_NAME_VALIDATION_SCHEMA,
    password: PASSWORD_VALIDATION_SCHEMA.password,
    confirmPassword: PASSWORD_VALIDATION_SCHEMA.password
});

/**
 * Sign up form.
 */
const SignUpForm: React.FC<SignUpFormProps> = (props: SignUpFormProps) => {
    const {onFinish, signUpPayload, disabled} = props;

    const onSubmit = (values: any, {setFieldError}: FormikHelpers<any>) => {
        onFinish(setFieldError);
    }

    const passwordEqualsValidator: FieldValidator = (value) => {
        return value === signUpPayload.password ? undefined : "Passwords isn't same";
    }

    return (
        <div className="sign-up-form">
            <Formik initialValues={signUpPayload}
                    onSubmit={onSubmit}
                    validationSchema={SIGNUP_FORM_VALIDATION_SCHEMA}>

                <Form>
                    <EmailField onChange={value => signUpPayload.email = value} disabled={disabled}/>

                    <UsernameField onChange={value => signUpPayload.userName = value} disabled={disabled}/>

                    <FullNameField onChange={value => signUpPayload.fullName = value} disabled={disabled}/>

                    <div className="passwords">
                        <PasswordField name="password"
                                       label="Password"
                                       onChange={value => signUpPayload.password = value}
                                       disabled={disabled}/>

                        <PasswordField name="confirmPassword"
                                       label="Confirm password"
                                       onChange={value => signUpPayload.confirmPassword = value}
                                       validator={passwordEqualsValidator}
                                       disabled={disabled}/>
                    </div>

                    <Button type="submit" disabled={disabled} loading={disabled}>Sign Up</Button>
                    <div className="login-offer">
                        Already have an acoount? <Link type="button" href={AuthorizationService.getLoginPagePreparedUrl()}>Login</Link>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default observer(SignUpForm);
