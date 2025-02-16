package com.johnsoncskoo.gymfinder.file.dto;

public record CreateImageDTO(
        String fileName,
        String description,
        Integer fileSize,
        String contentType,
        byte[] data
) {
}
