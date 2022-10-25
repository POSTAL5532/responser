package com.responser.backend.exceptions;

import java.util.NoSuchElementException;

/**
 * ResourceNotFoundException
 *
 * @author SIE
 */
public class ResourceNotFoundException extends NoSuchElementException {

    public ResourceNotFoundException() {
    }

    public ResourceNotFoundException(String s) {
        super(s);
    }
}
