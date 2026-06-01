package com.example.ant_track_sboot.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.ant_track_sboot.modelo.Usuario;
import com.example.ant_track_sboot.repositorio.IUsuarioRepositorio;
import com.example.ant_track_sboot.servicio.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final IUsuarioRepositorio usuarioRepository;

    public JwtFilter(JwtService jwtService, IUsuarioRepositorio usuarioRepository) {
        this.jwtService = jwtService;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
                                    throws ServletException, IOException {

        // IGNORAR LOGIN Y REGISTER
        if (request.getRequestURI().startsWith("/anttrackapi/v1/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 1. Leer el token del header
        final String authHeader = request.getHeader("Authorization");

        //Si no hay token → continuar
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // extraer token
        String token = authHeader.substring(7);

        // Obtener correo del token
        String correo = jwtService.extractCorreo(token);

        //Si hay correo y no hay usuario autenticado aún
        if (correo != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            Usuario usuario = usuarioRepository.findByCorreo(correo).orElse(null);

            //Si no existe → continuar
            if (usuario == null) {
                filterChain.doFilter(request, response);
                return;
            }

            //Validar token
            if (jwtService.isTokenValid(token, usuario.getCorreo())) {

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                usuario,
                                null,
                                List.of(new SimpleGrantedAuthority("ROLE_" + usuario.getRol().name()))
                        );

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // 🔥 6. Guardar autenticación en Spring
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

         }
         System.out.println("Rol: " + correo);
        System.out.println("Authority: ROLE_" + correo);

        // 🔹 7. Continuar filtro
        filterChain.doFilter(request, response);
    }
}
