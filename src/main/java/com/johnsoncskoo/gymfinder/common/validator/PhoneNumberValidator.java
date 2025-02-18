package com.johnsoncskoo.gymfinder.common.validator;

import jakarta.validation.ConstraintValidator;

public class PhoneNumberValidator implements ConstraintValidator<PhoneNumber, String> {
    @Override
    public void initialize(PhoneNumber constraintAnnotation) {
    }

    @Override
    public boolean isValid(String phoneNumber, jakarta.validation.ConstraintValidatorContext context) {
        if (phoneNumber == null) {
            return true;
        }
        return phoneNumber.matches("\\d{8,12}");
    }
}
