import { Role } from '../enums/role.enum';

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