import React from "react";
import {observer} from "mobx-react";
import {Formik, Form, FieldValidator} from "formik";
import * as Yup from "yup";
import {UserAccountDataPayload} from "app/model/UserAccountDataPayload";
import {FULL_NAME_VALIDATION_SCHEMA, FullNameField} from "app/logic/sign-up/form/FullNameField";
import {USERNAME_VALIDATION_SCHEMA, UsernameField} from "app/logic/sign-up/form/UsernameField";
import {Button} from "app/components/button/Button";
import {PASSWORD_VALIDATION_SCHEMA, PasswordField} from "app/logic/sign-up/form/PasswordField";
import {EMAIL_VALIDATION_SCHEMA, EmailField} from "app/logic/sign-up/form/EmailField";
import {FieldMessage} from "app/components/form/field-message/FieldMessage";
import AuthorizationService from "../../../service/authorization/AuthorizationService";
import {FieldLayout} from "../../../components/form/field-layout/FieldLayout";
import "./SignUpForm.less";

type SignUpFormProps = {
    signUpPayload: UserAccountDataPayload,
    onFinish: () => void,
    signUpErrors?: string[]
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
    const {onFinish, signUpPayload, signUpErrors} = props;

    const onSubmit = () => {
        console.log("ON SUBMIT");
        onFinish();
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
                    <FieldLayout label="Email">
                        <EmailField onChange={value => signUpPayload.email = value}/>
                    </FieldLayout>

                    <FieldLayout label="Username">
                        <UsernameField onChange={value => signUpPayload.userName = value}/>
                    </FieldLayout>

                    <FieldLayout label="Full name">
                        <FullNameField onChange={value => signUpPayload.fullName = value}/>
                    </FieldLayout>

                    <div className="passwords">
                        <FieldLayout label="Password">
                            <PasswordField name="password"
                                           placeholder="Enter password"
                                           onChange={value => signUpPayload.password = value}/>
                        </FieldLayout>

                        <FieldLayout label="Confirm password">
                            <PasswordField name="confirmPassword"
                                           placeholder="Confirm password"
                                           onChange={value => signUpPayload.confirmPassword = value}
                                           validator={passwordEqualsValidator}/>
                        </FieldLayout>
                    </div>

                    <div className="sign-up-errors">
                        {signUpErrors?.map((error, index) => (
                            <FieldMessage className="sign-up-error" key={index} isError={true}>
                                {error}
                            </FieldMessage>
                        ))}
                    </div>

                    <Button type="submit">Sign Up</Button>

                    <div className="login-offer">
                        <span>Already have account?</span>
                        <span className="login-link"
                              onClick={AuthorizationService.requestLoginPage}>
                            Login
                        </span>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default observer(SignUpForm);
