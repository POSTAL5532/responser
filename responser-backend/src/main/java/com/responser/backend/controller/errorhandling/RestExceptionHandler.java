package com.responser.backend.controller.errorhandling;

import com.responser.backend.controller.payload.ApiError;
import com.responser.backend.controller.payload.ApiErrorType;
import com.responser.backend.exceptions.EntityAlreadyExistException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.NoSuchElementException;

/**
 * Application global errors handler.
 *
 * @author Shcherbachenya Igor
 */
@Slf4j
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     * Handle {@link NoSuchElementException} and respond with 404 code
     *
     * @param exception NoSuchElementException
     * @return {@link ApiError} with {@link ApiErrorType#ENTITY_NOT_FOUND} error type
     */
    @ExceptionHandler({NoSuchElementException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ApiError<?> handleNoSuchElementException(NoSuchElementException exception) {
        log.error("Handle 'NoSuchElementException' {}", exception.getMessage());
        return new ApiError<>(exception.getMessage(), ApiErrorType.ENTITY_NOT_FOUND);
    }

    /**
     * Handle {@link EntityAlreadyExistException} and respond with 400 code
     *
     * @param exception EntityAlreadyExistException
     * @return {@link ApiError} with {@link ApiErrorType#VALIDATION_ERROR} error type
     */
    @ExceptionHandler({EntityAlreadyExistException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ApiError<?> handleEntityAlreadyExistException(EntityAlreadyExistException exception) {
        log.error("Handle 'EntityAlreadyExistException' {}", exception.getMessage());
        return new ApiError<>(exception.getMessage(), ApiErrorType.VALIDATION_ERROR);
    }

    /**
     * Handle {@link ConstraintViolationException} from spring validation logic for request body and respond with 400 code and list of fields errors.
     *
     * @param exception ConstraintViolationException
     * @return {@link ApiError} with {@link ApiErrorType#VALIDATION_ERROR} error type and list of fields errors
     */
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ApiError<List<Violation>> onConstraintValidationException(ConstraintViolationException exception) {
        log.error("Handle 'ConstraintViolationException' {}", exception.getMessage());
        ApiError<List<Violation>> response = new ApiError<>(exception.getMessage(), ApiErrorType.VALIDATION_ERROR, new ArrayList<>());

        for (ConstraintViolation<?> violation : exception.getConstraintViolations()) {
            Iterable<Path.Node> iterable = () -> violation.getPropertyPath().iterator();
            Stream<Path.Node> targetStream = StreamSupport.stream(iterable.spliterator(), false);
            List<Path.Node> list = targetStream.toList();
            String fieldName = list.get(list.size() - 1).getName();

            response.getData().add(new Violation(fieldName, violation.getMessage()));
        }

        return response;
    }

    /**
     * Handle {@link MethodArgumentNotValidException} from spring validation logic for request params and respond with 400 code and list of fields errors.
     *
     * @param exception MethodArgumentNotValidException
     * @return {@link ApiError} with {@link ApiErrorType#VALIDATION_ERROR} error type and list of fields errors
     */
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
        @NonNull MethodArgumentNotValidException exception,
        @NonNull HttpHeaders headers,
        @NonNull HttpStatusCode status,
        @NonNull WebRequest request
    ) {
        log.error("Handle 'MethodArgumentNotValidException' {}", exception.getMessage());
        ApiError<List<Violation>> response = new ApiError<>(exception.getMessage(), ApiErrorType.VALIDATION_ERROR, new ArrayList<>());

        for (FieldError fieldError : exception.getBindingResult().getFieldErrors()) {
            response.getData().add(
                new Violation(fieldError.getField(), fieldError.getDefaultMessage())
            );
        }

        return handleExceptionInternal(exception, response, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }
}
