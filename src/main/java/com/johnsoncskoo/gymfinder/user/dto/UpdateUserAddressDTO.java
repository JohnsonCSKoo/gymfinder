package com.johnsoncskoo.gymfinder.user.dto;

import com.johnsoncskoo.gymfinder.address.dto.AddressDTO;
import jakarta.annotation.Nullable;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserAddressDTO {
    @Nullable private AddressDTO homeAddress;
    @Nullable private AddressDTO workAddress;
    private boolean hasHomeAddress;

    public boolean hasHomeAddress() {
        return homeAddress != null;
    }

    public boolean hasWorkAddress() {
        return workAddress != null;
    }
}
