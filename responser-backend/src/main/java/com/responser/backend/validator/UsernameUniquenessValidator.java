package com.responser.backend.validator;

import com.responser.backend.service.KeycloakUserService;
import com.responser.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Email uniqueness validator
 *
 * @author SIE
 */
public class UsernameUniquenessValidator implements ConstraintValidator<UsernameUniqueness, String> {

    @Autowired
    private UserService userService;

    @Override
    public boolean isValid(String username, ConstraintValidatorContext cxt) {
        return !userService.existByUserName(username);
    }
}
