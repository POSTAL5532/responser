export class ApiError extends Error {

    apiError: boolean;

    message: string;

    errorType: ApiErrorType;

    data: any;

    constructor(apiError: boolean, message: string, errorType: ApiErrorType, data: any) {
        super(message);
        this.apiError = apiError;
        this.message = message;
        this.errorType = errorType;
        this.data = data;
    }
}

export enum ApiErrorType {

    ENTITY_NOT_FOUND = "ENTITY_NOT_FOUND",

    VALIDATION_ERROR = "VALIDATION_ERROR"
}
