import { Role } from './enums/role';

export interface RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface AuthResponseDto {
    data: {
        token: string;
    }
}