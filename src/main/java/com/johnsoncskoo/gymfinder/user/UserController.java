package com.johnsoncskoo.gymfinder.user;

import com.johnsoncskoo.gymfinder.user.dto.UpdateUserAddressDTO;
import com.johnsoncskoo.gymfinder.user.dto.UpdateUserDTO;
import com.johnsoncskoo.gymfinder.user.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    @PatchMapping("{userId}/address")
    public ResponseEntity<UpdateUserAddressDTO> updateAddress(
            @PathVariable String userId,
            @RequestBody @Validated UpdateUserAddressDTO addresses) {
        var response = userService.updateAddress(userId, addresses);
        return ResponseEntity.ok(response);
    }

    @GetMapping("{userId}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String userId) {
        var response = userService.getUser(userId);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("{userId}")
    public ResponseEntity<UpdateUserDTO> updateUser(
            @PathVariable String userId,
            @RequestBody @Validated UpdateUserDTO userDTO) {
        var response = userService.updateUser(userId, userDTO);
        return ResponseEntity.ok(response);
    }
}
