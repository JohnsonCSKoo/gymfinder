import axios from 'axios';
import {UpdateAddressDto} from "@/@types/address";
import {UpdateUserDto, UserDto} from "@/@types/user";

const BASE_URL = "http://localhost:8080/api/v1/users";
const getToken = (): string | null => sessionStorage.getItem('jwt');

export const updateUserAddress = (userId: string, data: UpdateAddressDto) =>
    axios.patch<UpdateAddressDto, UpdateAddressDto>(`${BASE_URL}/${userId}/address`, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }});

export const getUser = (userId: string) =>
    axios.get<null, UserDto>(`${BASE_URL}/${userId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }});

export const updateUser = (userId: string, data: UpdateUserDto)  =>
    axios.patch<UpdateUserDto, UpdateUserDto>(`${BASE_URL}/${userId}`, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }});