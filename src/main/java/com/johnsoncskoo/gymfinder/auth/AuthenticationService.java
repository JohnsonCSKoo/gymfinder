package com.johnsoncskoo.gymfinder.auth;

import com.johnsoncskoo.gymfinder.auth.dto.*;

public interface AuthenticationService {
    AuthenticationResponseDTO register(RegisterRequestDTO request);
    AuthenticationResponseDTO authenticate(AuthenticationRequestDTO request);
    AuthenticationResponseDTO refreshToken(AuthenticationRequestDTO request);
    AuthenticationResponseDTO updatePassword(UpdatePasswordRequestDTO request);
    boolean deleteAccount(DeleteAccountRequestDTO request);
}
