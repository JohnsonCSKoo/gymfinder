package com.johnsoncskoo.gymfinder.common.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public static ResourceNotFoundException toException(Class<?> entityType, Object id) {
        return new ResourceNotFoundException("No " + entityType.getSimpleName().toLowerCase() + " exists with the id: " + id);
    }
}
