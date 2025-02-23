import { Role } from './enums/role';

interface AuthDetailsDto {
    email: string;
    password: string;
}

export interface RegisterDto extends AuthDetailsDto {
    firstName: string;
    lastName: string;
    role: Role | string;
}

export type LoginDto = AuthDetailsDto;

export interface AuthResponseDto {
    data: {
        token: string;
    }
}

export interface ResetPasswordDto {
    email: string;
    oldPassword: string;
    newPassword: string;
}

export interface RefreshTokenDto {
    refreshToken: string;
}

export interface DeleteAccountDto {
    token: string;
    password: string;
}

export interface LogoutDto {
    token: string;
}