package com.responser.backend.controller.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ApiError
 *
 * @author SIE
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApiError {

    private String message;

    private String clientFriendlyMessage;

    private ApiErrorType type;
}

