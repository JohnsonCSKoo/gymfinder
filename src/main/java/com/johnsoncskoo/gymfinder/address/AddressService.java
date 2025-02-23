package com.johnsoncskoo.gymfinder.address;

import com.johnsoncskoo.gymfinder.address.dto.AddressDTO;
import com.johnsoncskoo.gymfinder.address.model.Address;

public interface AddressService {
    Address createAddress(AddressDTO addressDTO);
    Address updateAddress(Integer id, AddressDTO addressDTO);
    void deleteAddress(Integer id);
}
