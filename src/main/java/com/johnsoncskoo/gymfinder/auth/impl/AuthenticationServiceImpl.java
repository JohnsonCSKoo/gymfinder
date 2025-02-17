package com.johnsoncskoo.gymfinder.auth.impl;

import com.johnsoncskoo.gymfinder.auth.dto.AuthenticationRequestDTO;
import com.johnsoncskoo.gymfinder.auth.dto.AuthenticationResponseDTO;
import com.johnsoncskoo.gymfinder.auth.AuthenticationService;
import com.johnsoncskoo.gymfinder.auth.dto.RegisterRequestDTO;
import com.johnsoncskoo.gymfinder.common.exception.UserNotFoundException;
import com.johnsoncskoo.gymfinder.security.JwtService;
import com.johnsoncskoo.gymfinder.user.enums.Role;
import com.johnsoncskoo.gymfinder.user.User;
import com.johnsoncskoo.gymfinder.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

        var jwt = jwtService.generateToken(user);
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

        return AuthenticationResponseDTO.builder()
                .token(jwtService.generateToken(user))
                .build();
    }
}
