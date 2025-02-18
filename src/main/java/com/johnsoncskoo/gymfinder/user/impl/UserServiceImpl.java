package com.johnsoncskoo.gymfinder.user.impl;

import com.johnsoncskoo.gymfinder.address.dto.AddressDTO;
import com.johnsoncskoo.gymfinder.address.model.Address;
import com.johnsoncskoo.gymfinder.common.exception.ResourceNotFoundException;
import com.johnsoncskoo.gymfinder.user.UserService;
import com.johnsoncskoo.gymfinder.user.dto.UpdateUserAddressDTO;
import com.johnsoncskoo.gymfinder.user.dto.UpdateUserDTO;
import com.johnsoncskoo.gymfinder.user.dto.UserDTO;
import com.johnsoncskoo.gymfinder.user.model.User;
import com.johnsoncskoo.gymfinder.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UpdateUserDTO updateUser(String userId, UpdateUserDTO userDTO) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> ResourceNotFoundException.toException(User.class, userId));

        user.setFirstName(user.getFirstName());
        user.setLastName(user.getLastName());
        user.setGender(user.getGender());
        user.setPhoneNumber(user.getPhoneNumber());
        user.setUserTag(user.getUserTag());

        var savedUser = userRepository.save(user);
        return UpdateUserDTO.fromEntity(savedUser);
    }

    @Override
    public UpdateUserAddressDTO updateAddress(String userId, UpdateUserAddressDTO addresses) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> ResourceNotFoundException.toException(User.class, userId));

        // update home address
        if (addresses.hasHomeAddress()) {
            var address = user.getHomeAddress();

            address = getAddress(addresses.getHomeAddress(), address);

            user.setHomeAddress(address);
        }

        // update work address
        if (addresses.hasWorkAddress()) {
            var address = user.getWorkAddress();

            address = getAddress(addresses.getWorkAddress(), address);

            user.setWorkAddress(address);
        }

        var savedUser = userRepository.save(user);

        var response = new UpdateUserAddressDTO();
        if (savedUser.getHomeAddress() != null) {
            response.setHomeAddress(AddressDTO.fromEntity(savedUser.getHomeAddress()));
        }
        if (savedUser.getWorkAddress() != null) {
            response.setWorkAddress(AddressDTO.fromEntity(savedUser.getWorkAddress()));
        }
        return response;
    }

    @Override
    public UserDTO getUser(String userId) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> ResourceNotFoundException.toException(User.class, userId));

        return UserDTO.fromEntity(user);
    }

    private Address getAddress(AddressDTO addressDTO, Address address) {
        if (address == null) {
            address = new Address();
        }
        address.setBlockName(addressDTO.blockName());
        address.setStreetName(addressDTO.streetName());
        address.setFloorNo(addressDTO.floorNo());
        address.setUnitNo(addressDTO.unitNo());
        address.setPostalCode(addressDTO.postalCode());
        address.setState(addressDTO.state());
        address.setCountry(addressDTO.country());
        return address;
    }
}
