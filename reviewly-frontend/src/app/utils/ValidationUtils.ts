import * as Yup from "yup";

export const EMAIL_VALIDATION_SCHEMA = {
    email: Yup.string().required("Email is required").email("Invalid email")
}

const FULL_NAME_SIZE_VALID_MESSAGE = "Full name must be from 2 to 255 characters";

export const FULL_NAME_VALIDATION_SCHEMA = {
    fullName: Yup.string()
    .required("Full name is required")
    .min(2, FULL_NAME_SIZE_VALID_MESSAGE)
    .max(255, FULL_NAME_SIZE_VALID_MESSAGE)
}
