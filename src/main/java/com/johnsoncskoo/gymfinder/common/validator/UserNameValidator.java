package com.johnsoncskoo.gymfinder.common.validator;

import jakarta.validation.ConstraintValidator;

public class UserNameValidator implements ConstraintValidator<UserName, String> {
    @Override
    public void initialize(UserName constraintAnnotation) {
    }

    @Override
    public boolean isValid(String value, jakarta.validation.ConstraintValidatorContext context) {
        return value != null && value.matches("^[a-zA-Z0-9._-]{3,}$");
    }
}
