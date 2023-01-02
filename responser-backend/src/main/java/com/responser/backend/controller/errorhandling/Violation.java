package com.responser.backend.controller.errorhandling;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Violation class.
 */
@AllArgsConstructor
@Getter
public class Violation {

    /**
     * Field name with violation.
     */
    private final String fieldName;

    /**
     * Message of violation for field
     */
    private final String message;
}
