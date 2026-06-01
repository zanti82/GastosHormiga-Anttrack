package com.example.ant_track_sboot.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ant_track_sboot.DTO.LoginRequestDTO;
import com.example.ant_track_sboot.DTO.LoginResponseDTO;
import com.example.ant_track_sboot.DTO.RegisterRequestDTO;
import com.example.ant_track_sboot.modelo.Usuario;
import com.example.ant_track_sboot.servicio.AuthService;


@RestController
@RequestMapping("/anttrackapi/v1/auth")
public class AuthController {

    private final AuthService authService;
    
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

     // POST /api/auth/register - Registro de nuevos usuarios
    @PostMapping("/register")
    public ResponseEntity<Usuario> register(@RequestBody RegisterRequestDTO request) {
        Usuario nuevoUsuario = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
    }
    
    // POST /api/auth/login - Inicio de sesión
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request) {
        LoginResponseDTO response = authService.login(request);
        System.out.println("Authority: ROLE_" + response.getRol());
        return ResponseEntity.ok(response);
        
    }
    
}
