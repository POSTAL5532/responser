import React from "react";
import {observer} from "mobx-react";
import {Formik, Form, FieldValidator} from "formik";
import * as Yup from "yup";
import {UserAccountDataPayload} from "app/model/UserAccountDataPayload";
import {FIRST_NAME_VALIDATION_SCHEMA, FirstNameField} from "app/logic/sign-up/FirstNameField";
import {LAST_NAME_VALIDATION_SCHEMA, LastNameField} from "app/logic/sign-up/LastNameField";
import {USERNAME_VALIDATION_SCHEMA, UsernameField} from "app/logic/sign-up/UsernameField";
import {Button} from "app/components/button/Button";
import {PASSWORD_VALIDATION_SCHEMA, PasswordField} from "app/logic/sign-up/PasswordField";
import {EMAIL_VALIDATION_SCHEMA, EmailField} from "app/logic/sign-up/EmailField";
import {FieldBlock} from "app/components/form/FieldBlock";
import {Label} from "app/components/form/Label";
import {FieldMessage} from "app/components/form/FieldMessage";
import AuthorizationService from "../../service/authorization/AuthorizationService";

type SignUpFormProps = {
    signUpPayload: UserAccountDataPayload,
    onFinish: () => void,
    signUpErrors?: string[]
}

const SIGNUP_FORM_VALIDATION_SCHEMA = Yup.object().shape({
    ...USERNAME_VALIDATION_SCHEMA,
    ...EMAIL_VALIDATION_SCHEMA,
    ...FIRST_NAME_VALIDATION_SCHEMA,
    ...LAST_NAME_VALIDATION_SCHEMA,
    password: PASSWORD_VALIDATION_SCHEMA.password,
    confirmPassword: PASSWORD_VALIDATION_SCHEMA.password
});

/**
 * Sign up form.
 */
const SignUpForm: React.FC<SignUpFormProps> = (props: SignUpFormProps) => {
    const {onFinish, signUpPayload, signUpErrors} = props;

    const onSubmit = () => {
        onFinish();
    }

    const passwordEqualsValidator: FieldValidator = (value) => {
        return value === signUpPayload.password ? undefined : "Passwords isn't same";
    }

    return (
        <div className="sign-up-form">
            <Formik initialValues={signUpPayload} onSubmit={onSubmit} validationSchema={SIGNUP_FORM_VALIDATION_SCHEMA}>
                <Form>
                    <FieldBlock>
                        <Label htmlFor="userName">Username</Label>
                        <UsernameField onUsernameFieldChange={value => signUpPayload.userName = value}/>
                    </FieldBlock>
                    <FieldBlock>
                        <Label htmlFor="emailId">Email</Label>
                        <EmailField onEmailChange={value => signUpPayload.emailId = value}/>
                    </FieldBlock>
                    <FieldBlock>
                        <Label htmlFor="firstName">First name</Label>
                        <FirstNameField onFirstNameFieldChange={value => signUpPayload.firstName = value}/>
                    </FieldBlock>
                    <FieldBlock>
                        <Label htmlFor="lastName">Last name</Label>
                        <LastNameField onLastNameFieldChange={value => signUpPayload.lastName = value}/>
                    </FieldBlock>

                    <FieldBlock>
                        <Label htmlFor="password">Password</Label>
                        <PasswordField name="password" placeholder="input password"
                                       onPasswordChange={value => signUpPayload.password = value}/>
                    </FieldBlock>

                    <FieldBlock>
                        <Label htmlFor="confirmPassword">Confirm password</Label>
                        <PasswordField name="confirmPassword" placeholder="confirm password"
                                       onPasswordChange={value => signUpPayload.confirmPassword = value}
                                       validator={passwordEqualsValidator}/>
                    </FieldBlock>

                    <div className="sign-up-errors">
                        {signUpErrors?.map((error, index) => (
                            <FieldMessage key={index} isError={true} className="sign-up-error">{error}</FieldMessage>
                        ))}
                    </div>

                    <Button type="submit">Signup</Button>
                    <Button type="button" outlined={true} onClick={AuthorizationService.requestLoginPage}>Login</Button>
                </Form>
            </Formik>
        </div>
    );
}

export default observer(SignUpForm);
