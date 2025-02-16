package com.johnsoncskoo.gymfinder.file.dto;

import com.johnsoncskoo.gymfinder.file.model.Image;

public record ImageDTO(
        String id,
        String name,
        String url
) {

    public static ImageDTO fromEntity(Image image) {
        return new ImageDTO(
                image.getId(),
                image.getName(),
                image.getFile().getFileUrl()
        );
    }

    public static Image toEntity(ImageDTO image) {
        return Image.builder()
                .id(image.id)
                .name(image.name)
                .build();
    }
}
