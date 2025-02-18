package com.johnsoncskoo.gymfinder.user.dto;

import com.johnsoncskoo.gymfinder.common.validator.PhoneNumber;
import com.johnsoncskoo.gymfinder.common.validator.UserName;
import com.johnsoncskoo.gymfinder.user.enums.Gender;
import com.johnsoncskoo.gymfinder.user.model.User;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserDTO {
    @NotEmpty private String firstName;
    @NotEmpty private String lastName;
    @PhoneNumber private String phoneNumber;
    @UserName private String userTag;
    private Gender gender;

    public static UpdateUserDTO fromEntity(User user) {
        return UpdateUserDTO.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .userTag(user.getUserTag())
                .phoneNumber(user.getPhoneNumber())
                .gender(user.getGender())
                .build();
    }
}
