package com.johnsoncskoo.gymfinder.common.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;

@RequiredArgsConstructor
public class EnumValidator implements ConstraintValidator<Enum, String> {
    private ArrayList<String> validEnums;

    @Override
    public boolean isValid(String enumString, ConstraintValidatorContext constraintValidatorContext) {
        return validEnums.contains(enumString);
    }

    @Override
    public void initialize(Enum constraintAnnotation) {
        validEnums = new ArrayList<>();
        Class<? extends java.lang.Enum<?>> enumClass = constraintAnnotation.enumClass();

        java.lang.Enum<?>[] enumValArr = enumClass.getEnumConstants();

        for (java.lang.Enum<?> enumVal : enumValArr) {
            validEnums.add(enumVal.toString().toUpperCase());
        }
    }
}
