import {ApiError, ApiErrorType} from "../model/ApiError";

export const setErrorsToFields = (error: ApiError, setFieldError: (field: string, message: string) => void) => {
    const apiError = error as ApiError;
    Object.keys(error.data).forEach(key => setFieldError(key, apiError.data[key]));
}

export const isValidationError = (error: any): boolean => {
    return isApiError(error) && error.errorType == ApiErrorType.VALIDATION_ERROR;
}

export const isApiError = (error: any): boolean => {
    return error instanceof ApiError;
}