package com.johnsoncskoo.gymfinder.file.Impl;

import com.johnsoncskoo.gymfinder.common.exception.ResourceNotFoundException;
import com.johnsoncskoo.gymfinder.file.FileService;
import com.johnsoncskoo.gymfinder.file.ImageService;
import com.johnsoncskoo.gymfinder.file.Repository.ImageRepository;
import com.johnsoncskoo.gymfinder.file.dto.CreateFileDTO;
import com.johnsoncskoo.gymfinder.file.dto.CreateImageDTO;
import com.johnsoncskoo.gymfinder.file.dto.ImageDTO;
import com.johnsoncskoo.gymfinder.file.model.Image;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;
    private final FileService fileService;

    @Override
    public Image createImage(CreateImageDTO createImageDTO) {
        var createFileDTO = new CreateFileDTO(
                createImageDTO.fileName(),
                createImageDTO.description(),
                createImageDTO.fileSize(),
                createImageDTO.contentType(),
                createImageDTO.data()
        );
        var file = fileService.createFile(createFileDTO);

        var image = Image.builder()
                .name(createImageDTO.fileName())
                .file(file)
                .build();

        return imageRepository.save(image);
    }

    @Override
    public Iterable<ImageDTO> getImages(Iterable<String> ids) {
        return imageRepository.findAllById(ids)
                .stream().map(ImageDTO::fromEntity)
                .toList();
    }

    @Override
    public ImageDTO getImage(String id) {
        var image = imageRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.toException(Image.class, id));

        return ImageDTO.fromEntity(image);
    }

    @Override
    public void deleteImage(String id) {
        if (!imageRepository.existsById(id))
            throw ResourceNotFoundException.toException(Image.class, id);

        imageRepository.deleteById(id);
    }
}
