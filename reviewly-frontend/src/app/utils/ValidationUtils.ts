import * as Yup from "yup";

export type ValidationResult = {
    valid: boolean;
    errorMessage: string;
}

export const validateRequired = <T = any>(value: T, errorMessage?: string): ValidationResult => {
    return {
        valid: !!value,
        errorMessage: !value ? (errorMessage || "Value is required") : null
    }
}

const USERNAME_SIZE_VALID_MESSAGE = "Username must be from 2 to 255 characters";

export const USERNAME_VALIDATION_SCHEMA = {
    userName: Yup.string()
    .required("Username name is required")
    .min(2, USERNAME_SIZE_VALID_MESSAGE)
    .max(255, USERNAME_SIZE_VALID_MESSAGE)
}

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
