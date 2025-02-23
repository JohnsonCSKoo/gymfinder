package com.johnsoncskoo.gymfinder.address.dto;

import com.johnsoncskoo.gymfinder.address.enums.Country;
import com.johnsoncskoo.gymfinder.address.enums.State;
import com.johnsoncskoo.gymfinder.address.model.Address;
import lombok.Builder;

@Builder
public record AddressDTO(
        Integer id,
        String blockName,
        String streetName,
        String floorNo,
        String unitNo,
        String postalCode,
        State state,
        Country country
) {
    public static AddressDTO fromEntity(Address address) {
        return new AddressDTO(
                address.getId(),
                address.getBlockName(),
                address.getStreetName(),
                address.getFloorNo(),
                address.getUnitNo(),
                address.getPostalCode(),
                address.getState(),
                address.getCountry()
        );
    }

    public static Address toEntity(AddressDTO address) {
        return Address.builder()
                .id(address.id)
                .blockName(address.blockName)
                .streetName(address.streetName)
                .floorNo(address.floorNo)
                .unitNo(address.unitNo)
                .postalCode(address.postalCode)
                .state(address.state)
                .country(address.country)
                .build();
    }
}
