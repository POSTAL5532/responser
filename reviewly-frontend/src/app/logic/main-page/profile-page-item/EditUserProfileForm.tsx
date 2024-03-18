import React from "react";
import {Form, Formik} from "formik";
import {FormikHelpers} from "formik/dist/types";
import * as Yup from "yup";
import {observer} from "mobx-react";
import classNames from "classnames";
import {UpdateUserPayload} from "../../../model/UpdateUserPayload";
import {EMAIL_VALIDATION_SCHEMA, FULL_NAME_VALIDATION_SCHEMA, USERNAME_VALIDATION_SCHEMA} from "../../../utils/ValidationUtils";
import {EmailField} from "../../../components/form/EmailField";
import {UsernameField} from "../../../components/form/UsernameField";
import {FullNameField} from "../../../components/form/FullNameField";
import {Button, ButtonSize, ButtonType} from "../../../components/button/Button";
import {Spinner} from "../../../components/spinner/Spinner";
import {Tooltip, TooltipPosition} from "../../../components/tooltip/Tooltip";
import {Icon, IconType} from "../../../components/icon/Icon";
import "./EditUserProfileForm.less";

type EditUserProfileFormProps = {
    updateUserPayload: UpdateUserPayload;
    onFinish: (setFieldError?: (field: string, message: string) => void) => void;
    userWasChanged: boolean;
    isEmailConfirmed: boolean;
    resendConfirmationEmail: () => void;
    isEmailConfirmationProcess: boolean;
    isConfirmationResent: boolean;
    loading: boolean;
}

const EDIT_USER_FORM_VALIDATION_SCHEMA = Yup.object().shape({
    ...USERNAME_VALIDATION_SCHEMA,
    ...EMAIL_VALIDATION_SCHEMA,
    ...FULL_NAME_VALIDATION_SCHEMA
});

const EditUserProfileForm: React.FC<EditUserProfileFormProps> = (props: EditUserProfileFormProps) => {
    const {
        updateUserPayload,
        onFinish,
        loading,
        isEmailConfirmed,
        resendConfirmationEmail,
        isEmailConfirmationProcess,
        isConfirmationResent,
        userWasChanged
    } = props;

    const onSubmit = (values: any, {setFieldError}: FormikHelpers<any>) => {
        onFinish(setFieldError);
    }

    if (!updateUserPayload) {
        return <Spinner/>;
    }

    const getEmailTooltipContent = () => {
        if (isConfirmationResent) {
            return <span>Email confirmation link was sent to you. Check your email and confirm.</span>;
        }

        return (
            <>
                <span>Confirm your email by clicking the link in the message from Reviewly to access all the features of the service.</span>
                <Button
                    className="confirm-email-button"
                    styleType={ButtonType.LINK}
                    size={ButtonSize.SMALL}
                    disabled={isEmailConfirmationProcess}
                    onClick={resendConfirmationEmail}>
                    Resend confirmation
                </Button>
            </>
        );
    };

    const emailTooltipActivation = (): boolean => {
        if (isEmailConfirmationProcess) {
            return true;
        }

        if (isEmailConfirmed) {
            return false;
        }

        return undefined;
    }

    const emailFieldClassName = classNames("email-field", {"not-confirmed": !isEmailConfirmed})

    return (
        <Formik
            initialValues={updateUserPayload}
            onSubmit={onSubmit}
            validationSchema={EDIT_USER_FORM_VALIDATION_SCHEMA}>

            <Form className="edit-user-form">
                <UsernameField label="Username" onChange={event => updateUserPayload.userName = event.target.value} disabled={loading}/>
                <FullNameField label="Full name" onChange={event => updateUserPayload.fullName = event.target.value} disabled={loading}/>

                <Tooltip className="email-tooltip" position={TooltipPosition.RIGHT} content={getEmailTooltipContent()} show={emailTooltipActivation()}>
                    <EmailField
                        className={emailFieldClassName}
                        label="Email"
                        onChange={event => updateUserPayload.email = event.target.value}
                        disabled={loading}
                        rightExtraComponent={<Icon type={isEmailConfirmed ? IconType.CHECK : IconType.CIRCLE_ALERT}/>}/>
                </Tooltip>

                <Button type="submit"
                        className="update-user"
                        loading={loading || isEmailConfirmationProcess}
                        styleType={ButtonType.PRIMARY}
                        disabled={loading || isEmailConfirmationProcess || !userWasChanged}>
                    Save
                </Button>
            </Form>
        </Formik>
    );
}

export default observer(EditUserProfileForm)
