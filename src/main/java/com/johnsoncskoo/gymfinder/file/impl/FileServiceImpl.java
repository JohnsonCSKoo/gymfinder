package com.johnsoncskoo.gymfinder.file.impl;

import com.johnsoncskoo.gymfinder.common.exception.FileStorageException;
import com.johnsoncskoo.gymfinder.common.exception.ResourceNotFoundException;
import com.johnsoncskoo.gymfinder.file.FileService;
import com.johnsoncskoo.gymfinder.file.repository.FileRepository;
import com.johnsoncskoo.gymfinder.file.dto.CreateFileDTO;
import com.johnsoncskoo.gymfinder.file.dto.FileDTO;
import com.johnsoncskoo.gymfinder.file.model.File;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    @Value("${file.file-upload.path}")
    private String FILE_PATH;

    private final FileRepository fileRepository;
    private Path fileStorageLocation;

    @PostConstruct
    public void init() throws IOException {
        fileStorageLocation = Paths.get(FILE_PATH)
                .toAbsolutePath()
                .normalize();

        Files.createDirectories(fileStorageLocation);
    }

    @Override
    public File createFile(CreateFileDTO fileDTO) {
        var uuid = String.valueOf(UUID.randomUUID());
        var fileName = uuid + "-" + fileDTO.fileName();
        var targetLocation = fileStorageLocation.resolve(fileName);
        InputStream stream = new ByteArrayInputStream(fileDTO.data());

        // save file to directory
        try {
            Files.copy(stream, targetLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException exception) {
            throw new FileStorageException(
                    "An error occurred while trying to store file: " + fileName,
                    exception
            );
        }

        var file = File.builder()
                .id(uuid)
                .fileName(fileDTO.fileName())
                .description(fileDTO.description())
                .fileSize(fileDTO.fileSize())
                .contentType(fileDTO.contentType())
                .filePath(targetLocation.toString())
                .fileUrl(FILE_PATH + fileName)
                .build();

        return fileRepository.save(file);
    }

    @Override
    public Iterable<FileDTO> getFiles(Iterable<String> ids) {
        return fileRepository.findAllById(ids)
                .stream().map(FileDTO::fromEntity)
                .toList();
    }

    @Override
    public FileDTO getFile(String id) {
        var file = fileRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.toException(File.class, id));

        return FileDTO.fromEntity(file);
    }

    @Override
    public void deleteFile(String id) {
        var file = fileRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.toException(File.class, id));

        var filePath = Paths.get(file.getFilePath());

        try {
            Files.delete(filePath);
        } catch (IOException exception) {
            throw new FileStorageException(
                    "An error occurred while trying to delete file: " + file.getFileName(),
                    exception
                    );
        }

        fileRepository.delete(file);
    }
}
