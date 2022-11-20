package com.responser.backend.controller.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ApiError
 *
 * @author SIE
 */
@NoArgsConstructor
@Data
public class ApiError {

    private Boolean apiError = true;

    private String message;

    private String clientFriendlyMessage;

    private ApiErrorType errorType;

    public ApiError(String message, String clientFriendlyMessage, ApiErrorType errorType) {
        this.message = message;
        this.clientFriendlyMessage = clientFriendlyMessage;
        this.errorType = errorType;
    }
}

