package space.reviewly.backend.controller.errorHandling;

import space.reviewly.backend.controller.payload.ApiError;
import space.reviewly.backend.controller.payload.ApiErrorType;
import space.reviewly.backend.exceptions.DataNotValidException;
import space.reviewly.backend.exceptions.EntityAlreadyExistException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.NoSuchElementException;

/**
 * Application global errors handler.
 *
 * @author Shcherbachenya Igor
 */
/*@Slf4j
@ControllerAdvice*/
public class RestExceptionHandler /*extends ResponseEntityExceptionHandler*/ {

    /**
     * Handle {@link NoSuchElementException} and respond with 404 code
     *
     * @param exception NoSuchElementException
     * @return {@link ApiError} with {@link ApiErrorType#ENTITY_NOT_FOUND} error type
     */
    /*@ExceptionHandler({NoSuchElementException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ApiError<?> handleNoSuchElementException(NoSuchElementException exception) {
        log.error("Handle 'NoSuchElementException' {}", exception.getMessage());
        return new ApiError<>(exception.getMessage(), ApiErrorType.ENTITY_NOT_FOUND);
    }*/

    /**
     * Handle {@link EntityAlreadyExistException} and respond with 400 code
     *
     * @param exception EntityAlreadyExistException
     * @return {@link ApiError} with {@link ApiErrorType#VALIDATION_ERROR} error type
     */
    /*@ExceptionHandler({EntityAlreadyExistException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ApiError<?> handleEntityAlreadyExistException(EntityAlreadyExistException exception) {
        log.error("Handle 'EntityAlreadyExistException' {}", exception.getMessage());
        return new ApiError<>(exception.getMessage(), ApiErrorType.VALIDATION_ERROR);
    }*/

    /**
     * Handle {@link ConstraintViolationException} from spring validation logic for request body and respond with 400 code and list of fields errors.
     *
     * @param exception ConstraintViolationException
     * @return {@link ApiError} with {@link ApiErrorType#VALIDATION_ERROR} error type and list of fields errors
     */
    /*@ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ApiError<Map<String, List<String>>> onConstraintValidationException(ConstraintViolationException exception) {
        log.error("Handle 'ConstraintViolationException' {}", exception.getMessage());
        ApiError<Map<String, List<String>>> response2 = new ApiError<>("Validation error", ApiErrorType.VALIDATION_ERROR, new HashMap<>());

        for (ConstraintViolation<?> violation : exception.getConstraintViolations()) {
            Iterable<Path.Node> iterable = () -> violation.getPropertyPath().iterator();
            Stream<Path.Node> targetStream = StreamSupport.stream(iterable.spliterator(), false);
            List<Path.Node> list = targetStream.toList();
            String fieldName = list.get(list.size() - 1).getName();

            Map<String, List<String>> data = response2.getData();
            List<String> fieldMessages = data.computeIfAbsent(fieldName, k -> new ArrayList<>());
            fieldMessages.add(violation.getMessage());
        }

        return response2;
    }*/

    /**
     * Handle {@link MethodArgumentNotValidException} from spring validation logic for request params and respond with 400 code and list of fields errors.
     *
     * @param exception MethodArgumentNotValidException
     * @return {@link ApiError} with {@link ApiErrorType#VALIDATION_ERROR} error type and list of fields errors
     */
    /*@Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
        @NonNull MethodArgumentNotValidException exception,
        @NonNull HttpHeaders headers,
        @NonNull HttpStatusCode status,
        @NonNull WebRequest request
    ) {
        log.error("Handle 'MethodArgumentNotValidException' {}", exception.getMessage());
        ApiError<Map<String, List<String>>> response2 = new ApiError<>("Validation error", ApiErrorType.VALIDATION_ERROR, new HashMap<>());

        for (FieldError fieldError : exception.getBindingResult().getFieldErrors()) {
            Map<String, List<String>> data = response2.getData();
            List<String> fieldMessages = data.computeIfAbsent(fieldError.getField(), k -> new ArrayList<>());
            fieldMessages.add(fieldError.getDefaultMessage());
        }

        return handleExceptionInternal(exception, response2, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }*/

    /**
     * Handle {@link DataNotValidException} validation errors.
     *
     * @param exception DataNotValidException
     * @return {@link ApiError} with {@link ApiErrorType#VALIDATION_ERROR} error type and list of fields errors
     */
    /*@ExceptionHandler(DataNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    protected ApiError<Map<String, List<String>>> handleDataNotValidException(DataNotValidException exception) {
        log.error("Handle 'ConstraintViolationException' {}", exception.getMessage());
        return new ApiError<>("Validation error", ApiErrorType.VALIDATION_ERROR, exception.getFieldsErrors());
    }*/
}
