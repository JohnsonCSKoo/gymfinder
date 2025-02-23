import {Gender} from "@/@types/enums/gender.ts";
import {AddressDto} from "@/@types/address";


interface UserSettings {
    firstName?: string;
    lastName?: string;
    phone?: string;
    username?: string;
    email?: string;
    gender?: Gender | string;
}

export interface UpdateUserDto {
    firstName: string;
    lastName: string;
    userTag?: string;
    phoneNumber?: string;
    gender?: Gender | string;
}

export interface UserDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userTag: string;
    gender: Gender | string;
    homeAddress: AddressDto | null;
    workAddress: AddressDto | null;
}