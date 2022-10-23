import React from "react";
import {observer} from "mobx-react";
import * as Yup from 'yup';
import {Formik, Form} from "formik";
import {navigateToSignUpPage} from "app/logic/sign-up/SignUpPage";
import {LoginPayload} from "app/service/authorization/LoginPayload";
import {Button} from "app/components/button/Button";
import {EmailField, LOGIN_EMAIL_VALIDATION_SCHEMA} from "app/logic/login/EmailField";
import {LOGIN_PASSWORD_VALIDATION_SCHEMA, PasswordField} from "app/logic/login/PasswordField";
import {FieldBlock} from "app/components/form/FieldBlock";
import {Label} from "app/components/form/Label";
import {FieldMessage} from "app/components/form/FieldMessage";

type LoginFormProps = {
    loginPayload: LoginPayload,
    onFinish: () => void,
    credentialsError?: string
}

const LOGIN_FORM_VALIDATION_SCHEMA = Yup.object().shape({
    ...LOGIN_EMAIL_VALIDATION_SCHEMA,
    ...LOGIN_PASSWORD_VALIDATION_SCHEMA
})

/**
 * Login form.
 */
export const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
    const {loginPayload, onFinish, credentialsError} = props;

    return (
        <div className="login-form">
            <Formik<LoginPayload>
                initialValues={loginPayload}
                validationSchema={LOGIN_FORM_VALIDATION_SCHEMA}
                onSubmit={onFinish}>
                <Form>
                    <FieldBlock>
                        <Label htmlFor="email">Username or Email</Label>
                        <EmailField onEmailChange={value => loginPayload.email = value}/>
                    </FieldBlock>
                    <FieldBlock>
                        <Label htmlFor="password">Password</Label>
                        <PasswordField onPasswordChange={value => loginPayload.password = value}/>
                    </FieldBlock>

                    <FieldMessage isError={true} visible={!!credentialsError} className="credentials-error">
                        {credentialsError}
                    </FieldMessage>

                    <Button type="submit">Login</Button>
                    <Button type="button" outlined={true} onClick={navigateToSignUpPage}>Sign up</Button>
                </Form>
            </Formik>
        </div>
    );
}

export default observer(LoginForm);
