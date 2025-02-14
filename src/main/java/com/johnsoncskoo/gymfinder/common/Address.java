package com.johnsoncskoo.gymfinder.common;

import com.johnsoncskoo.gymfinder.user.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(nullable = true)
    private String blockName;

    @Column(nullable = true)
    private String streetName;

    @Column(nullable = true)
    private String floorNo;

    @Column(nullable = true)
    private String unitNo;

    @Column(nullable = false)
    private String postalCode;

    // To move state and country to separate tables if needed in the future
    @Column(nullable = false)
    private State state;

    @Column(nullable = false)
    private Country country;

    @OneToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;
}
