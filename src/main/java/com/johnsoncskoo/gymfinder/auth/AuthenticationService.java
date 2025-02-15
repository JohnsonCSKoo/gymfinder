package com.johnsoncskoo.gymfinder.auth;

import com.johnsoncskoo.gymfinder.auth.dto.AuthenticationRequest;
import com.johnsoncskoo.gymfinder.auth.dto.AuthenticationResponse;
import com.johnsoncskoo.gymfinder.auth.dto.RegisterRequest;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);
    AuthenticationResponse authenticate(AuthenticationRequest request);
}
