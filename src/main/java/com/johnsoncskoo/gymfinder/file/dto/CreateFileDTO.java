package com.johnsoncskoo.gymfinder.file.dto;

public record CreateFileDTO(
        String fileName,
        String description,
        Integer fileSize,
        String contentType,
        byte[] data
){}
