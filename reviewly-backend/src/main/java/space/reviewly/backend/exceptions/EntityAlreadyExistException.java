package space.reviewly.backend.exceptions;

import java.util.NoSuchElementException;

/**
 * Entity already exist exception
 *
 * @author Shcherbachenya Igor
 */
public class EntityAlreadyExistException extends NoSuchElementException {

    public EntityAlreadyExistException() {
    }

    public EntityAlreadyExistException(String message) {
        super(message);
    }
}
