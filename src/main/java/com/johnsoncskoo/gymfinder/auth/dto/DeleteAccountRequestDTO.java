package com.johnsoncskoo.gymfinder.auth.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeleteAccountRequestDTO {
    private String email;
    private String password;
}
