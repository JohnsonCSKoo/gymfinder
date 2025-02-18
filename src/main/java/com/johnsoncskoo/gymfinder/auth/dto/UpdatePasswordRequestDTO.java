package com.johnsoncskoo.gymfinder.auth.dto;

import com.johnsoncskoo.gymfinder.common.validator.Password;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePasswordRequestDTO {
    @NotEmpty private String oldPassword;

    @Password
    @NotEmpty
    private String newPassword;
}
