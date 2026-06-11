package com.example.ant_track_sboot.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableMethodSecurity 
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

  
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
    
                //  CORS preflight
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
    
                //  public
                .requestMatchers("/anttrackapi/v1/auth/login").permitAll()
                .requestMatchers("/anttrackapi/v1/auth/register").permitAll()
                .requestMatchers(HttpMethod.POST, "/anttrackapi/v1/usuarios").permitAll()
    
                //  GASTOS — user and admin
                .requestMatchers("/anttrackapi/v1/gastos/**").hasAnyRole("ADMIN", "USER")

                //  reportes — user and admin
                .requestMatchers("/anttrackapi/v1/reportes/**").hasAnyRole("ADMIN", "USER")
    
                //  CATEGORIAS
                .requestMatchers(HttpMethod.GET, "/anttrackapi/v1/categorias/**").hasAnyRole("ADMIN", "USER")
                .requestMatchers(HttpMethod.POST, "/anttrackapi/v1/categorias/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/anttrackapi/v1/categorias/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/anttrackapi/v1/categorias/**").hasRole("ADMIN")
    
                //  COMERCIOS
                .requestMatchers(HttpMethod.GET, "/anttrackapi/v1/comercios/**").hasAnyRole("ADMIN", "USER")
                .requestMatchers(HttpMethod.POST, "/anttrackapi/v1/comercios/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/anttrackapi/v1/comercios/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/anttrackapi/v1/comercios/**").hasRole("ADMIN")
    
                //  METODO PAGOS
                .requestMatchers(HttpMethod.GET, "/anttrackapi/v1/metodopagos/**").hasAnyRole("ADMIN", "USER")
                .requestMatchers(HttpMethod.POST, "/anttrackapi/v1/metodopagos/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/anttrackapi/v1/metodopagos/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/anttrackapi/v1/metodopagos/**").hasRole("ADMIN")
    
                //  USUARIOS
                .requestMatchers(HttpMethod.GET, "/anttrackapi/v1/usuarios/**").hasAnyRole("ADMIN", "USER")
                .requestMatchers(HttpMethod.POST, "/anttrackapi/v1/usuarios/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/anttrackapi/v1/usuarios/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/anttrackapi/v1/usuarios/**").hasRole("ADMIN")
    
                //  DASHBOARD AND REPORTS
                .requestMatchers("/anttrackapi/v1/dashboard/**").hasAnyRole("ADMIN", "USER")
                .requestMatchers("/anttrackapi/v1/reportes/**").hasAnyRole("ADMIN", "USER")
    
                .anyRequest().authenticated()
            )
            .csrf(csrf -> csrf.disable())
            .headers(headers -> headers
                .frameOptions(frame -> frame.disable())
            );
    
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();

    }
    //permissos para conectar front CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
       // read from environment variable
       String allowedOrigins = System.getenv("ALLOWED_ORIGINS");

       // fallback to localhost if variable is missing
           if (allowedOrigins == null || allowedOrigins.isEmpty()) {
               allowedOrigins = "http://localhost:5173";
           }
   
       // split by comma so you can pass multiple origins
       List<String> origins = List.of(allowedOrigins.split(","));

       config.setAllowedOrigins(origins);
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true); // necesario para JWT en headers
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
