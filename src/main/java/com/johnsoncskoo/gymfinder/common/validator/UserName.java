package com.johnsoncskoo.gymfinder.common.validator;

import jakarta.validation.Constraint;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UserNameValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface UserName {
    String message() default "Invalid username";

    Class<?>[] groups() default {};

    Class<?>[] payload() default {};
}
