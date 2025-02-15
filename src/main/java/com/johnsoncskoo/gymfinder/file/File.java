package com.johnsoncskoo.gymfinder.file;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "files")
public class File {

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
    @JsonIgnore
    private byte[] data;
}
