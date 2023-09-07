package com.responser.backend.controller;

import com.responser.backend.controller.payload.ApiError;
import com.responser.backend.controller.payload.ApiErrorType;
import com.responser.backend.exceptions.DataNotValidException;
import com.responser.backend.exceptions.EntityAlreadyExistException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Path;
import jakarta.validation.Path.Node;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Slf4j
public abstract class RestApiController {

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
    public ApiError<Map<String, List<String>>> onConstraintViolationException(ConstraintViolationException exception) {
        log.error("Handle 'ConstraintViolationException' {}", exception.getMessage());

        ApiError<Map<String, List<String>>> apiError = new ApiError<>("Validation error", ApiErrorType.VALIDATION_ERROR, new HashMap<>());

        for (ConstraintViolation<?> violation : exception.getConstraintViolations()) {
            Iterable<Path.Node> iterable = () -> violation.getPropertyPath().iterator();
            Stream<Node> targetStream = StreamSupport.stream(iterable.spliterator(), false);
            List<Path.Node> list = targetStream.toList();
            String fieldName = list.get(list.size() - 1).getName();

            Map<String, List<String>> data = apiError.getData();
            List<String> fieldMessages = data.computeIfAbsent(fieldName, k -> new ArrayList<>());
            fieldMessages.add(violation.getMessage());
        }

        return apiError;
    }

    /**
     * Handle {@link MethodArgumentNotValidException} from spring validation logic for request params and respond with 400 code and list of fields errors.
     *
     * @param exception MethodArgumentNotValidException
     * @return {@link ApiError} with {@link ApiErrorType#VALIDATION_ERROR} error type and list of fields errors
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    protected ApiError<Map<String, List<String>>> handleMethodArgumentNotValid(@NonNull MethodArgumentNotValidException exception) {
        log.error("Handle 'MethodArgumentNotValidException' {}", exception.getMessage());
        ApiError<Map<String, List<String>>> apiError = new ApiError<>("Validation error", ApiErrorType.VALIDATION_ERROR, new HashMap<>());

        for (FieldError fieldError : exception.getBindingResult().getFieldErrors()) {
            Map<String, List<String>> data = apiError.getData();
            List<String> fieldMessages = data.computeIfAbsent(fieldError.getField(), k -> new ArrayList<>());
            fieldMessages.add(fieldError.getDefaultMessage());
        }

        return apiError;
    }

    /**
     * Handle {@link DataNotValidException} validation errors.
     *
     * @param exception DataNotValidException
     * @return {@link ApiError} with {@link ApiErrorType#VALIDATION_ERROR} error type and list of fields errors
     */
    @ExceptionHandler(DataNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    protected ApiError<Map<String, List<String>>> handleDataNotValidException(DataNotValidException exception) {
        log.error("Handle 'ConstraintViolationException' {}", exception.getMessage());
        return new ApiError<>("Validation error", ApiErrorType.VALIDATION_ERROR, exception.getFieldsErrors());
    }

    /**
     * Handle {@link DataNotValidException} validation errors.
     *
     * @param exception DataNotValidException
     * @return {@link ApiError} with {@link ApiErrorType#VALIDATION_ERROR} error type and list of fields errors
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    protected ApiError<?> handleOtherException(Exception exception) {
        log.error("Handle 'ConstraintViolationException' {}", exception.getMessage());
        return new ApiError<>("Internal server error", ApiErrorType.UNKNOWN_ERROR);
    }
}
