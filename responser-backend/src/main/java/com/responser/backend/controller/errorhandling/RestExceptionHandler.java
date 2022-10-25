package com.responser.backend.controller.errorhandling;

import com.responser.backend.controller.payload.ApiError;
import com.responser.backend.controller.payload.ApiErrorType;
import com.responser.backend.controller.payload.ApiResponse;
import com.responser.backend.controller.payload.ApiResponseStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.NoSuchElementException;

/**
 * RestExceptionHandler
 *
 * @author SIE
 */
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({NoSuchElementException.class})
    public ResponseEntity<Object> handleNoSuchElementException(NoSuchElementException ex, WebRequest request) {
        ApiResponse<ApiError> response = new ApiResponse<>(
                ApiResponseStatus.ERROR,
                new ApiError(ex.getMessage(), "Entity not found", ApiErrorType.ENTITY_NOT_FOUND)
        );
        return handleExceptionInternal(ex, response, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }
}
