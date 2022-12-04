export class ApiError {

    apiError: boolean;

    message: string;

    clientFriendlyMessage: string;

    errorType: ApiErrorType;
}

export enum ApiErrorType {

    ENTITY_NOT_FOUND = "ENTITY_NOT_FOUND",

    VALIDATION_ERROR = "VALIDATION_ERROR"
}
