package com.johnsoncskoo.gymfinder.common.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PasswordValidator implements ConstraintValidator<Password, String> {

    private static final String REGEX_PATTERN =
            "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$";

    @Override
    public boolean isValid(String password, ConstraintValidatorContext constraintValidatorContext) {
        if(password == null) {
            return false;
        }
        return password.matches(REGEX_PATTERN);
    }
}
