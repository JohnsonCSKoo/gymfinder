import { State } from './enums/state';
import { Country } from './enums/country';
import {AddressType} from "@/@types/enums/addressType.ts";

interface UserAddressSettings {
    [AddressType.HOME]: AddressDto | null;
    [AddressType.WORK]: AddressDto | null;
    hasWorkAddress: boolean;
}

export interface UpdateAddressDto {
    homeAddress: AddressDto | null;
    workAddress: AddressDto | null;
    hasWorkAddress: boolean;
}

export interface AddressDto {
    blockName: string;
    streetName: string;
    floorNo: string;
    unitNo: string;
    postalCode: string;
    state: State;
    country: Country;
}