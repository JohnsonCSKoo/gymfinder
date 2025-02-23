package com.johnsoncskoo.gymfinder.user;

import com.johnsoncskoo.gymfinder.user.dto.UpdateUserAddressDTO;
import com.johnsoncskoo.gymfinder.user.dto.UpdateUserDTO;
import com.johnsoncskoo.gymfinder.user.dto.UserDTO;

public interface UserService {
    UpdateUserDTO updateUser(String userId, UpdateUserDTO userDTO);
    UpdateUserAddressDTO updateAddress(String userId, UpdateUserAddressDTO addresses);
    UserDTO getUser(String userId);
}
