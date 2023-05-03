export class ApiError<T = any> {

    apiError: boolean;

    message: string;

    errorType: ApiErrorType;

    data: T;
}

export enum ApiErrorType {

    ENTITY_NOT_FOUND = "ENTITY_NOT_FOUND",

    VALIDATION_ERROR = "VALIDATION_ERROR"
}
