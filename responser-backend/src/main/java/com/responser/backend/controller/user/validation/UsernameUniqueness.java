package com.responser.backend.controller.user.validation;

import com.responser.backend.service.UserService;
import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;
import java.lang.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Username uniqueness validation
 *
 * @author SIE
 */
@Documented
@Constraint(validatedBy = UsernameUniqueness.UsernameUniquenessValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface UsernameUniqueness {

    String message() default "Non unique field";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    class UsernameUniquenessValidator implements ConstraintValidator<UsernameUniqueness, String> {

        @Autowired
        private UserService userService;

        @Override
        public boolean isValid(String username, ConstraintValidatorContext cxt) {
            return !userService.existByUserName(username);
        }
    }
}
