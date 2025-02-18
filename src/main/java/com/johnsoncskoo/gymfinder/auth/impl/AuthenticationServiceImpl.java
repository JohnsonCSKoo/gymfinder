package com.johnsoncskoo.gymfinder.auth.impl;

import com.johnsoncskoo.gymfinder.auth.dto.*;
import com.johnsoncskoo.gymfinder.auth.AuthenticationService;
import com.johnsoncskoo.gymfinder.common.exception.UserNotFoundException;
import com.johnsoncskoo.gymfinder.security.JwtService;
import com.johnsoncskoo.gymfinder.user.enums.Role;
import com.johnsoncskoo.gymfinder.user.model.User;
import com.johnsoncskoo.gymfinder.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponseDTO register(RegisterRequestDTO request) {
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);

        var extraClaims = new HashMap<String, Object>();
        extraClaims.put("userId", user.getId());

        var jwt = jwtService.generateToken(extraClaims, user);
        return AuthenticationResponseDTO.builder()
                .token(jwt)
                .build();
    }

    @Override
    public AuthenticationResponseDTO authenticate(AuthenticationRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found."));

        var extraClaims = new HashMap<String, Object>();
        extraClaims.put("userId", user.getId());

        return AuthenticationResponseDTO.builder()
                .token(jwtService.generateToken(extraClaims, user))
                .build();
    }

    @Override
    public AuthenticationResponseDTO refreshToken(AuthenticationRequestDTO request) {
        return null;
    }

    @Override
    public AuthenticationResponseDTO updatePassword(UpdatePasswordRequestDTO request) {
        return null;
    }

    @Override
    public boolean deleteAccount(DeleteAccountRequestDTO request) {
        return false;
    }
}
