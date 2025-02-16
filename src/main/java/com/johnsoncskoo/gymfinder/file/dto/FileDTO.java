package com.johnsoncskoo.gymfinder.file.dto;

import com.johnsoncskoo.gymfinder.file.model.File;

public record FileDTO(
        String id,
        String fileName,
        String description,
        Integer fileSize,
        String contentType,
        String filePath,
        String fileUrl) {

    public static FileDTO fromEntity(File file) {
        return new FileDTO(
                file.getId(),
                file.getFileName(),
                file.getDescription(),
                file.getFileSize(),
                file.getContentType(),
                file.getFilePath(),
                file.getFileUrl()
        );
    }

    public static File toEntity(FileDTO file) {
        return File.builder()
                .id(file.id)
                .fileName(file.fileName)
                .fileSize(file.fileSize)
                .description(file.description)
                .contentType(file.contentType)
                .filePath(file.filePath)
                .fileUrl(file.fileUrl)
                .build();
    }
}

