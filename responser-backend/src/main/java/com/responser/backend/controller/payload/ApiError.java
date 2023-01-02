package com.responser.backend.controller.payload;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ApiError
 *
 * @author SIE
 */
@NoArgsConstructor
@Data
public class ApiError<T> {

    private Boolean apiError = true;

    private String message;

    private ApiErrorType errorType;

    private T data;

    public ApiError(String message,ApiErrorType errorType) {
        this(message, errorType, null);
    }

    public ApiError(String message, ApiErrorType errorType, T data) {
        this.message = message;
        this.errorType = errorType;
        this.data = data;
    }
}

