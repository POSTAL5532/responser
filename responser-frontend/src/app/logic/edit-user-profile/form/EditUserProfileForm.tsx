import React from "react";
import {Form, Formik} from "formik";
import {FormikHelpers} from "formik/dist/types";
import * as Yup from "yup";
import {observer} from "mobx-react";
import {UpdateUserPayload} from "../../../model/UpdateUserPayload";
import {EMAIL_VALIDATION_SCHEMA, FULL_NAME_VALIDATION_SCHEMA, USERNAME_VALIDATION_SCHEMA} from "../../../utils/ValidationUtils";
import {EmailField} from "../../../components/form/EmailField";
import {UsernameField} from "../../../components/form/UsernameField";
import {FullNameField} from "../../../components/form/FullNameField";
import {Button, ButtonType} from "../../../components/button/Button";
//import {navigateToUserProfilePage} from "../../user-profile/UserProfilePage";
import "./EditUserProfileForm.less";

type EditUserProfileFormProps = {
    updateUserPayload: UpdateUserPayload;
    onFinish: (setFieldError?: (field: string, message: string) => void) => void;
    userWasChanged: boolean;
    disabled?: boolean;
}

const EDIT_USER_FORM_VALIDATION_SCHEMA = Yup.object().shape({
    ...USERNAME_VALIDATION_SCHEMA,
    ...EMAIL_VALIDATION_SCHEMA,
    ...FULL_NAME_VALIDATION_SCHEMA
});

const EditUserProfileForm: React.FC<EditUserProfileFormProps> = (props: EditUserProfileFormProps) => {
    const {updateUserPayload, onFinish, disabled, userWasChanged} = props;

    const onSubmit = (values: any, {setFieldError}: FormikHelpers<any>) => {
        onFinish(setFieldError);
    }

    return (
        <div className="edit-user-form">
            <Formik initialValues={updateUserPayload}
                    onSubmit={onSubmit}
                    validationSchema={EDIT_USER_FORM_VALIDATION_SCHEMA}>
                <Form>
                    {/*<EmailField onChange={value => updateUserPayload.email = value} disabled={disabled}/>

                    <UsernameField onChange={value => updateUserPayload.userName = value} disabled={disabled}/>

                    <FullNameField onChange={value => updateUserPayload.fullName = value} disabled={disabled}/>*/}

                    <div className="form-controls">
                        <Button type="submit" loading={disabled} disabled={disabled || !userWasChanged}>{!disabled ? "Save" : "Wait"}</Button>
                        {/*<Button type="button" onClick={navigateToUserProfilePage} styleType={ButtonType.LIGHT} disabled={disabled}>Cancel</Button>*/}
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default observer(EditUserProfileForm)
