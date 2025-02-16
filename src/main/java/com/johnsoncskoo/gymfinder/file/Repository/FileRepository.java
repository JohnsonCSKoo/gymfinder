package com.johnsoncskoo.gymfinder.file.Repository;

import com.johnsoncskoo.gymfinder.file.model.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<File, String> {
}
