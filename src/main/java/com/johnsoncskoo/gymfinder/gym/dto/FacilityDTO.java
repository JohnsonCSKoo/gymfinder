package com.johnsoncskoo.gymfinder.gym.dto;

import com.johnsoncskoo.gymfinder.gym.enums.FacilityType;
import com.johnsoncskoo.gymfinder.gym.model.Facility;

public record FacilityDTO(
        Integer id,
        String name,
        String description,
        FacilityType facilityType
) {
    public static FacilityDTO fromEntity(Facility facility) {
        return new FacilityDTO(
                facility.getId(),
                facility.getName(),
                facility.getDescription(),
                facility.getFacilityType()
        );
    }

    public static Facility toEntity(FacilityDTO facility) {
        return Facility.builder()
                .id(facility.id)
                .name(facility.name)
                .description(facility.description)
                .facilityType(facility.facilityType)
                .build();
    }
}
