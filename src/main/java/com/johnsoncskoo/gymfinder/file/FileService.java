package com.johnsoncskoo.gymfinder.file;

import com.johnsoncskoo.gymfinder.file.dto.CreateFileDTO;
import com.johnsoncskoo.gymfinder.file.dto.FileDTO;
import com.johnsoncskoo.gymfinder.file.model.File;

public interface FileService {
    File createFile(CreateFileDTO fileDTO);
    Iterable<FileDTO> getFiles(Iterable<String> ids);
    FileDTO getFile(String id);
    void deleteFile(String id);
}
