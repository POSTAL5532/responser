package com.responser.backend.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

/**
 * Username uniqueness validation
 *
 * @author SIE
 */
@Documented
@Constraint(validatedBy = UsernameUniquenessValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface UsernameUniqueness {

    String message() default "Non unique field";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
