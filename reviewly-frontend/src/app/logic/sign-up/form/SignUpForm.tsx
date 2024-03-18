import React from "react";
import {observer} from "mobx-react";
import {FieldValidator, Form, Formik} from "formik";
import * as Yup from "yup";
import {UserAccountDataPayload} from "app/model/UserAccountDataPayload";
import {Button, ButtonType} from "app/components/button/Button";
import {PASSWORD_VALIDATION_SCHEMA, PasswordField} from "app/components/form/PasswordField";
import {FormikHelpers} from "formik/dist/types";
import {EMAIL_VALIDATION_SCHEMA, FULL_NAME_VALIDATION_SCHEMA, USERNAME_VALIDATION_SCHEMA} from "../../../utils/ValidationUtils";
import {EmailField} from "../../../components/form/EmailField";
import {UsernameField} from "../../../components/form/UsernameField";
import {FullNameField} from "../../../components/form/FullNameField";
import {InputFieldStyleType} from "../../../components/form/input-field/InputField";
import {Tooltip} from "../../../components/tooltip/Tooltip";
import "./SignUpForm.less";

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
                    <EmailField onChange={({target}) => signUpPayload.email = target.value}
                                disabled={disabled}
                                styleType={InputFieldStyleType.SECONDARY}/>

                    <UsernameField onChange={({target}) => signUpPayload.userName = target.value}
                                   disabled={disabled}
                                   styleType={InputFieldStyleType.SECONDARY}/>

                    <FullNameField onChange={({target}) => signUpPayload.fullName = target.value}
                                   disabled={disabled}
                                   styleType={InputFieldStyleType.SECONDARY}/>

                    <Tooltip content="Password must contains minimum eight characters, at least one letter and one number.">
                        <PasswordField name="password"
                                       placeholder="Password"
                                       onChange={({target}) => signUpPayload.password = target.value}
                                       disabled={disabled}
                                       styleType={InputFieldStyleType.SECONDARY}/>
                    </Tooltip>

                    <Tooltip content="Password must contains minimum eight characters, at least one letter and one number.">
                        <PasswordField name="confirmPassword"
                                       placeholder="Confirm password"
                                       className="confirm-password"
                                       onChange={({target}) => signUpPayload.confirmPassword = target.value}
                                       validator={passwordEqualsValidator}
                                       disabled={disabled}
                                       styleType={InputFieldStyleType.SECONDARY}/>
                    </Tooltip>

                    <Button type="submit" className="submit" styleType={ButtonType.PRIMARY} disabled={disabled} loading={disabled}>Sign Up</Button>
                </Form>
            </Formik>
        </div>
    );
}

export default observer(SignUpForm);
