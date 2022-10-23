package com.responser.backend.utils;

/**
 * ValidationUtils
 *
 * @author SIE
 */
public class ValidationUtils {

    /**
     * Minimum eight characters, at least one letter and one number
     */
    public static final String PASSWORD_PATTERN = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$";
}
