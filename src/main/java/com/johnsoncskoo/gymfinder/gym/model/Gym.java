package com.johnsoncskoo.gymfinder.gym.model;

import com.johnsoncskoo.gymfinder.address.model.Address;
import com.johnsoncskoo.gymfinder.common.model.Auditable;
import com.johnsoncskoo.gymfinder.file.model.Image;
import com.johnsoncskoo.gymfinder.gym.enums.OpeningStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "gyms")
public class Gym extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    @OneToOne(
            optional = false,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "address_id")
    private Address address;

    @Column
    @Enumerated(EnumType.STRING)
    private OpeningStatus openingStatus;

    @ManyToMany
    @JoinTable(
            name = "gym_image",
            joinColumns = @JoinColumn(name = "gym_id"),
            inverseJoinColumns = @JoinColumn(name = "image_id")
    )
    private Set<Image> images;

    @OneToMany(mappedBy = "gym")
    private List<Equipment> equipments;

    @OneToMany(mappedBy = "gym")
    private List<Facility> facilities;

    @OneToMany(mappedBy = "gym")
    private List<Service> services;

    public void addImage(Image image) {
        images.add(image);
    }

    public void removeImage(Image image) {
        images.remove(image);
    }
}
