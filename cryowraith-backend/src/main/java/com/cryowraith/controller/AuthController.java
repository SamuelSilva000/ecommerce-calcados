package com.cryowraith.controller;

import com.cryowraith.dto.LoginRequest;
import com.cryowraith.dto.LoginResponse;
import com.cryowraith.dto.RegistroRequest;
import com.cryowraith.model.Usuario;
import com.cryowraith.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registro(@Valid @RequestBody RegistroRequest req) {
        String result = usuarioService.registrar(req);
        if (!result.equals("ok")) {
            return ResponseEntity.badRequest().body(Map.of("message", result));
        }
        return ResponseEntity.ok(Map.of("message", "ok"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        LoginResponse resp = usuarioService.login(req);
        if (resp == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Credenciais inválidas"));
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @PutMapping("/perfil")
    public ResponseEntity<?> atualizarPerfil(@RequestBody Map<String, String> body) {
        boolean ok = usuarioService.atualizarPerfil(
                body.get("email"), body.get("nome"), body.get("senha"));
        if (!ok) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(Map.of("message", "ok"));
    }
}