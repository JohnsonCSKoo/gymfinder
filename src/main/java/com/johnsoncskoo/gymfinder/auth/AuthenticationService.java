package com.johnsoncskoo.gymfinder.auth;

import com.johnsoncskoo.gymfinder.auth.dto.*;

public interface AuthenticationService {
    AuthenticationResponseDTO register(RegisterRequestDTO request);
    AuthenticationResponseDTO authenticate(AuthenticationRequestDTO request);
    AuthenticationResponseDTO refreshToken(RefreshTokenRequestDTO request);
    AuthenticationResponseDTO updatePassword(UpdatePasswordRequestDTO request);
    void deleteAccount(DeleteAccountRequestDTO request);
    void logout(LogoutRequestDTO request);
}
