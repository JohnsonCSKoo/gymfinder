package com.johnsoncskoo.gymfinder.auth;

import com.johnsoncskoo.gymfinder.auth.dto.AuthenticationRequestDTO;
import com.johnsoncskoo.gymfinder.auth.dto.AuthenticationResponseDTO;
import com.johnsoncskoo.gymfinder.auth.dto.RegisterRequestDTO;

public interface AuthenticationService {
    AuthenticationResponseDTO register(RegisterRequestDTO request);
    AuthenticationResponseDTO authenticate(AuthenticationRequestDTO request);
}
