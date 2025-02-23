package com.johnsoncskoo.gymfinder.file.repository;

import com.johnsoncskoo.gymfinder.file.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, String> {
}
