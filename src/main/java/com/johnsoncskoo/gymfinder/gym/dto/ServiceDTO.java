package com.johnsoncskoo.gymfinder.gym.dto;

import com.johnsoncskoo.gymfinder.gym.enums.ServiceType;
import com.johnsoncskoo.gymfinder.gym.model.Service;

public record ServiceDTO(
        Integer id,
        String name,
        String description,
        ServiceType serviceType
) {
    public static ServiceDTO fromEntity(Service service) {
        return new ServiceDTO(
                service.getId(),
                service.getName(),
                service.getDescription(),
                service.getServiceType()
        );
    }

    public static Service toEntity(ServiceDTO service) {
        return Service.builder()
                .id(service.id)
                .name(service.name)
                .description(service.description)
                .serviceType(service.serviceType)
                .build();
    }
}
