package com.johnsoncskoo.gymfinder.gym.model;

import com.johnsoncskoo.gymfinder.common.model.Auditable;
import com.johnsoncskoo.gymfinder.file.model.Image;
import com.johnsoncskoo.gymfinder.gym.enums.FacilityType;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "facilities")
public class Facility extends Auditable {

    @Id
    @GeneratedValue
    private Integer id;

    @Column
    private String name;

    @Column
    private String description;

    @Enumerated(EnumType.STRING)
    private FacilityType facilityType;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(
            name = "gym_id",
            nullable = false
    )
    private Gym gym;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "facility_image",
            joinColumns = @JoinColumn(name = "facility_id"),
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
