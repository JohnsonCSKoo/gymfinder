package com.johnsoncskoo.gymfinder.user.dto;

import com.johnsoncskoo.gymfinder.address.dto.AddressDTO;
import com.johnsoncskoo.gymfinder.user.enums.Gender;
import com.johnsoncskoo.gymfinder.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String userTag;
    private Gender gender;
    private AddressDTO homeAddress;
    private AddressDTO workAddress;

    public static UserDTO fromEntity(User user) {
        return new UserDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getUserTag(),
                user.getGender(),
                user.hasHomeAddress() ? AddressDTO.fromEntity(user.getHomeAddress()) : null,
                user.hasWorkAddress() ? AddressDTO.fromEntity(user.getWorkAddress()) : null
        );
    }
}
