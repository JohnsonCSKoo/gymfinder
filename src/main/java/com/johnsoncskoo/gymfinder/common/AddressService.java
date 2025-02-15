package com.johnsoncskoo.gymfinder.common;

import com.johnsoncskoo.gymfinder.common.dto.AddressDTO;
import com.johnsoncskoo.gymfinder.common.model.Address;

public interface AddressService {
    Address createAddress(AddressDTO addressDTO);
    Address updateAddress(Integer id, AddressDTO addressDTO);
    void deleteAddress(Integer id);
}
