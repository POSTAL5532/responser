package space.reviewly.backend.controller.user.validation;

import space.reviewly.backend.service.UserService;
import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;
import java.lang.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Email uniqueness validation
 *
 * @author Shcherbachenya Igor
 */
@Documented
@Constraint(validatedBy = EmailUniqueness.EmailUniquenessValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface EmailUniqueness {

    String message() default "Non unique field";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    class EmailUniquenessValidator implements ConstraintValidator<EmailUniqueness, String> {

        @Autowired
        private UserService userService;

        @Override
        public boolean isValid(String email, ConstraintValidatorContext cxt) {
            return !userService.existByEmail(email);
        }
    }
}
