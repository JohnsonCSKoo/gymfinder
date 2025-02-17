package com.johnsoncskoo.gymfinder.common.impl;

import com.johnsoncskoo.gymfinder.common.AddressService;
import com.johnsoncskoo.gymfinder.common.dto.AddressDTO;
import com.johnsoncskoo.gymfinder.common.exception.ResourceNotFoundException;
import com.johnsoncskoo.gymfinder.common.model.Address;
import com.johnsoncskoo.gymfinder.common.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    @Override
    public Address createAddress(AddressDTO addressDTO) {
        var address = AddressDTO.toEntity(addressDTO);
        return addressRepository.save(address);
    }

    @Override
    public Address updateAddress(Integer id, AddressDTO addressDTO) {
        var address = addressRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.toException(Address.class, id));
        address.setBlockName(addressDTO.blockName());
        address.setStreetName(addressDTO.streetName());
        address.setUnitNo(addressDTO.unitNo());
        address.setFloorNo(addressDTO.floorNo());
        address.setState(addressDTO.state());
        address.setCountry(addressDTO.country());
        return addressRepository.save(address);
    }

    @Override
    public void deleteAddress(Integer id) {
        if (!addressRepository.existsById(id))
            throw ResourceNotFoundException.toException(Address.class, id);

        addressRepository.deleteById(id);
    }
}
