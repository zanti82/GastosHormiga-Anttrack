package com.example.ant_track_sboot.servicio;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.ant_track_sboot.DTO.LoginRequestDTO;
import com.example.ant_track_sboot.DTO.LoginResponseDTO;
import com.example.ant_track_sboot.DTO.RegisterRequestDTO;
import com.example.ant_track_sboot.modelo.Usuario;
import com.example.ant_track_sboot.modelo.utils.Estado;
import com.example.ant_track_sboot.repositorio.IUsuarioRepositorio;

@Service
public class AuthService {
     private final IUsuarioRepositorio usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    
    //inyeccion
    public AuthService(IUsuarioRepositorio usuarioRepository, 
                      PasswordEncoder passwordEncoder,
                      JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;;
    }

       // Registro de nuevos usuarios
    public Usuario register(RegisterRequestDTO request) {
        
          // Validar que la identificación no esté registrada
          Optional<Usuario> existente = usuarioRepository.findByCorreo(request.getDocumento());
          if (existente.isPresent()) {
            throw new RuntimeException("La identificación ya está registrada");
        }
        // Validar que el correo no esté registrado
        Optional<Usuario> correo = usuarioRepository.findByCorreo(request.getCorreo());
        if (correo.isPresent()) {
            throw new RuntimeException("El correo ya está registrado");
        }
        
        // Encriptar contraseña
        String passwordEncriptado = passwordEncoder.encode(request.getPassword());

        // Crear nuevo usuario
        Usuario usuario = new Usuario( //este el construct, debe llevar todos los param
            request.getNombre(),
            request.getTipoDocumento(),
            request.getDocumento(),
            request.getEdad(),
            request.getGenero(),
            request.getCorreo(),
            request.getTelefono(),
            request.getDireccion(),
            request.getPresupMensual(),
            passwordEncriptado  // ya encriptado
        );

                
        
      
              
        // Guardar en BD
        return usuarioRepository.save(usuario);
    }
    
    // Login (autenticación)
    public LoginResponseDTO login(LoginRequestDTO request) {
        
        // Buscar usuario por correo
        Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreo(request.getCorreo());
        
        if (!usuarioOpt.isPresent()) {
            throw new RuntimeException("Credenciales inválidas");
        }
        
        Usuario usuario = usuarioOpt.get();
        
        // Verificar que esté activo
        if (usuario.getEstado() == Estado.INACTIVO) {
            throw new RuntimeException("Usuario inactivo");
        }

        System.out.println(usuario.getPassword());
        
        // Verificar contraseña
        boolean passwordMatch = passwordEncoder.matches(
            request.getPassword(),      // Contraseña ingresada
            usuario.getPassword()        // Contraseña encriptada en BD
        );
        
        if (!passwordMatch) {
            throw new RuntimeException("Credenciales inválidas");
            
        }

        //usamos el jwt

        String token = jwtService.generateToken(
            usuario.getCorreo(),
            usuario.getRol().name()
        );
        
        // Login exitoso - crear respuesta
        LoginResponseDTO response = new LoginResponseDTO();
        response.setIdentificacion(usuario.getDocumento());
        response.setCorreo(usuario.getCorreo());
        response.setRol(usuario.getRol().name());
        response.setMessage("Login exitoso");
        response.setToken(token);  // aca va el jwt
        
        return response;
    }


    
}

