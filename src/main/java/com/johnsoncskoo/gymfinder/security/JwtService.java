package com.johnsoncskoo.gymfinder.security;

import com.johnsoncskoo.gymfinder.user.model.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;

public interface JwtService {
    String extractUsername(String jwt);
    String generateToken(User userDetails);
    String generateToken(Map<String, Object> extraClaims, User userDetails);
    boolean isTokenValid(String jwt, User userDetails);
}
