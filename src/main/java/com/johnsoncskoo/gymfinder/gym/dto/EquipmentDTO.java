package com.johnsoncskoo.gymfinder.gym.dto;

import com.johnsoncskoo.gymfinder.gym.enums.EquipmentType;
import com.johnsoncskoo.gymfinder.gym.model.Equipment;
import lombok.Builder;

@Builder
public record EquipmentDTO(
        Integer id,
        String name,
        String description,
        EquipmentType equipmentType
) {
    public static EquipmentDTO fromEntity(Equipment equipment) {
        return new EquipmentDTO(
                equipment.getId(),
                equipment.getName(),
                equipment.getDescription(),
                equipment.getEquipmentType()
        );
    }

    public static Equipment toEntity(EquipmentDTO equipment) {
        return Equipment.builder()
                .id(equipment.id)
                .name(equipment.name)
                .description(equipment.description)
                .equipmentType(equipment.equipmentType)
                .build();
    }
}
