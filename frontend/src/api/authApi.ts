import axios from "axios";
import {AuthResponseDto, LoginDto, RegisterDto} from "@/@types/auth";

const BASE_URL = "http://localhost:8080/api/v1/auth";

export const register = (data: RegisterDto) =>
    axios.post<RegisterDto, AuthResponseDto>(`${BASE_URL}/register`, data);

export const login = (data: LoginDto)  =>
    axios.post<LoginDto, AuthResponseDto>(`${BASE_URL}/authenticate`, data);