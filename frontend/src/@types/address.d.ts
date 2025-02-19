import { State } from './enums/state';
import { Country } from './enums/country';

export interface UpdateAddressDto {
    homeAddress: AddressDto | null,
    workAddress: AddressDto | null
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