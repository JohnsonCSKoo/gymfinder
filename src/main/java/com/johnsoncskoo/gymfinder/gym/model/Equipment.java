package com.johnsoncskoo.gymfinder.gym.model;

import com.johnsoncskoo.gymfinder.common.model.Auditable;
import com.johnsoncskoo.gymfinder.file.model.Image;
import com.johnsoncskoo.gymfinder.gym.enums.EquipmentType;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "equipments")
public class Equipment extends Auditable {

    @Id
    private Integer id;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    @Enumerated(EnumType.STRING)
    private EquipmentType equipmentType;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(
            name = "gym_id",
            nullable = false
    )
    private Gym gym;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "equipment_image",
            joinColumns = @JoinColumn(name = "equipment_id"),
            inverseJoinColumns = @JoinColumn(name = "image_id")
    )
    private Set<Image> images;


    public void addImage(Image image) {
        images.add(image);
    }

    public void removeImage(Image image) {
        images.remove(image);
    }
}
