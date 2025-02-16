package com.johnsoncskoo.gymfinder.gym.model;

import com.johnsoncskoo.gymfinder.common.model.Auditable;
import com.johnsoncskoo.gymfinder.gym.enums.ServiceType;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "services")
public class Service extends Auditable {

    @Id
    @GeneratedValue
    private Integer id;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    @Enumerated(EnumType.STRING)
    private ServiceType serviceType;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(
            name = "gym_id",
            nullable = false
    )
    private Gym gym;
}
