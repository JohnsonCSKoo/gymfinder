package com.johnsoncskoo.gymfinder.file.model;

import com.johnsoncskoo.gymfinder.common.model.Auditable;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "images")
public class Image extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column
    private String name;

    @OneToOne
    @JoinColumn(name = "file_id")
    private File file;
}
