package com.johnsoncskoo.gymfinder.auth;

import com.johnsoncskoo.gymfinder.auth.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDTO> register(
            @RequestBody @Validated RegisterRequestDTO request
    ) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponseDTO> authenticate(
            @RequestBody @Validated AuthenticationRequestDTO request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PutMapping("/password")
    public ResponseEntity<AuthenticationResponseDTO> resetPassword(
            @RequestBody @Validated UpdatePasswordRequestDTO request
    ) {
        return ResponseEntity.ok(authenticationService.updatePassword(request));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponseDTO> refreshToken(
            @RequestBody @Validated RefreshTokenRequestDTO request
    ) {
        return ResponseEntity.ok(authenticationService.refreshToken(request));
    }

    @PostMapping("/account")
    public ResponseEntity<HttpStatus> deleteAccount(
            @RequestBody @Validated DeleteAccountRequestDTO request
    ) {
        authenticationService.deleteAccount(request);
        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/logout")
    public ResponseEntity<HttpStatus> logout(
            @RequestBody @Validated LogoutRequestDTO request
    ) {
        authenticationService.logout(request);
        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }
}
