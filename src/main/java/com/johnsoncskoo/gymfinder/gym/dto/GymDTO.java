package com.johnsoncskoo.gymfinder.gym.dto;

import com.johnsoncskoo.gymfinder.address.dto.AddressDTO;
import com.johnsoncskoo.gymfinder.gym.enums.OpeningStatus;
import com.johnsoncskoo.gymfinder.gym.model.Gym;

public record GymDTO(
        String id,
        String name,
        AddressDTO address,
        OpeningStatus openingStatus
) {
    public static GymDTO fromEntity(Gym gym) {
        return new GymDTO(
                gym.getId(),
                gym.getName(),
                AddressDTO.fromEntity(gym.getAddress()),
                gym.getOpeningStatus()
        );
    }

    public static Gym toEntity(GymDTO gym) {
        return Gym.builder()
                .id(gym.id)
                .name(gym.name)
                .address(AddressDTO.toEntity(gym.address))
                .openingStatus(gym.openingStatus)
                .build();
    }
}
