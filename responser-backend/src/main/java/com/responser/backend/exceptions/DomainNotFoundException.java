package com.responser.backend.exceptions;

import java.util.NoSuchElementException;

/**
 * DomainNotFoundException
 *
 * @author SIE
 */
public class DomainNotFoundException extends NoSuchElementException {

    public DomainNotFoundException() {
    }

    public DomainNotFoundException(String s) {
        super(s);
    }
}
