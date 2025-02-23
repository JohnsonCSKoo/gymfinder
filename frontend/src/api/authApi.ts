import axios from "axios";
import {AuthResponseDto, DeleteAccountDto, LoginDto, LogoutDto, RefreshTokenDto, RegisterDto, ResetPasswordDto} from "@/@types/auth";

const BASE_URL = "http://localhost:8080/api/v1/auth";

export const register = (data: RegisterDto) =>
    axios.post<RegisterDto, AuthResponseDto>(`${BASE_URL}/register`, data);

export const login = (data: LoginDto)  =>
    axios.post<LoginDto, AuthResponseDto>(`${BASE_URL}/authenticate`, data);

export const resetPassword = (data: ResetPasswordDto) =>
    axios.put<ResetPasswordDto, AuthResponseDto>(`${BASE_URL}/password`, data);

export const refreshToken = (data: RefreshTokenDto) =>
    axios.post<RefreshTokenDto, AuthResponseDto>(`${BASE_URL}/refresh-token`, data);

export const deleteAccount = (data: DeleteAccountDto) =>
    axios.post<DeleteAccountDto, never>(`${BASE_URL}/account`, data);

export const logout = (data: LogoutDto) =>
    axios.post<LogoutDto, never>(`${BASE_URL}/logout`, data);