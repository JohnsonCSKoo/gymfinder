import {Gender} from "@/@types/enums/gender.ts";
import {AddressDto} from "@/@types/address";

export interface UpdateUserDto {
    firstName: string;
    lastName: string;
    userTag: string;
    phoneNumber: string;
    gender: Gender;
}

export interface UserDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userTag: string;
    gender: Gender;
    homeAddress: AddressDto | null;
    workAddress: AddressDto | null;
}