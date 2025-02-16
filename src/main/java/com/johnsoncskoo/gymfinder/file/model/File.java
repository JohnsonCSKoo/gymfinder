package com.johnsoncskoo.gymfinder.file.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.johnsoncskoo.gymfinder.common.model.Auditable;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "files")
public class File extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column
    private String fileName;

    @Column
    private String description;

    @Column
    private Integer fileSize;

    @Column
    private String contentType;

    @Column
    private String filePath;

    @Column(nullable = true)
    private String fileUrl;
}
