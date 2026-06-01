package com.example.ant_track_sboot.servicio;

import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private final String SECRET_KEY = "mi_clave_super_segura_1234567890123456";

    
    //Generar token
    public String generateToken(String correo, String rol) {

        return Jwts.builder()
                .setSubject(correo)
                .claim("rol", rol)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hora
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Obtener correo del token
    public String extractCorreo(String token) {
        return extractAllClaims(token).getSubject();
    }

    //Obtener rol
    public String extractRol(String token) {
        return extractAllClaims(token).get("rol", String.class);
    }

    //Validar token
    public boolean isTokenValid(String token, String correo) {
        final String correoExtraido = extractCorreo(token);
        return (correoExtraido.equals(correo) && !isTokenExpired(token));
    }

    //Verificar expiración
    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    //Obtener todos los datos
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    //Clave de firma
    private Key getSignKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }
}

