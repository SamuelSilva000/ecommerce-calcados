package com.cryowraith.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String nome;
    private String email;
    private String role;
    private String token;
}