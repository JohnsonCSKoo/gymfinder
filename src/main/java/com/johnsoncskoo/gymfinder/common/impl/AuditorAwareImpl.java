package com.johnsoncskoo.gymfinder.common.impl;

import com.johnsoncskoo.gymfinder.user.model.User;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<String> {
    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }

        // Assuming your User class is the principal and has a getId() method
        Object principal = authentication.getPrincipal();
        if (principal instanceof User user) {
            return Optional.of(user.getId());
        }

        return Optional.empty();
    }
}
