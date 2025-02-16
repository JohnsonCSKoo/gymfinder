package com.johnsoncskoo.gymfinder.file;

import com.johnsoncskoo.gymfinder.file.dto.CreateImageDTO;
import com.johnsoncskoo.gymfinder.file.dto.ImageDTO;
import com.johnsoncskoo.gymfinder.file.model.Image;

public interface ImageService {
    Image createImage(CreateImageDTO imageDTO);
    Iterable<ImageDTO> getImages(Iterable<String> ids);
    ImageDTO getImage(String id);
    void deleteImage(String id);
}
