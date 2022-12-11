package com.responser.backend.exceptions;

import java.util.NoSuchElementException;

/**
 * EntityAlreadyExistException
 *
 * @author SIE
 */
public class EntityAlreadyExistException extends NoSuchElementException {

    public EntityAlreadyExistException() {
    }

    public EntityAlreadyExistException(String s) {
        super(s);
    }
}
