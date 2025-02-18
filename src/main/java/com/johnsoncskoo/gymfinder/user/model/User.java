package com.johnsoncskoo.gymfinder.user.model;

import com.johnsoncskoo.gymfinder.address.model.Address;
import com.johnsoncskoo.gymfinder.common.model.BaseAuditable;
import com.johnsoncskoo.gymfinder.user.enums.Gender;
import com.johnsoncskoo.gymfinder.user.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User extends BaseAuditable implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(unique = true)
    private String phoneNumber;

    @Column(unique = true)
    private String userTag;

    @Column(nullable = false)
    private String password;

    @Column
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @OneToOne(
            optional = true,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "home_address_id")
    private Address homeAddress;

    @OneToOne(
            optional = true,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "work_address_id")
    private Address workAddress;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    public boolean hasHomeAddress() {
        return homeAddress != null;
    }

    public boolean hasWorkAddress() {
        return workAddress != null;
    }
}
