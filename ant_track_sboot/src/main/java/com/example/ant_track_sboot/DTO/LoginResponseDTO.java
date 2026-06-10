package com.example.ant_track_sboot.DTO;

public class LoginResponseDTO {

    private Long id;          
    private String nombre;    
    private String identificacion;
    private String correo;
    private String rol;
    private String token;
    private String message;

    // Constructores
    public LoginResponseDTO() {}

    public LoginResponseDTO(Long id, String nombre, String identificacion, 
        String correo, String rol, String message) {
        this.id = id;
        this.nombre = nombre;
        this.identificacion = identificacion;
        this.correo = correo;
        this.rol = rol;
        this.message = message;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getIdentificacion() { return identificacion; }
    public void setIdentificacion(String identificacion) { this.identificacion = identificacion; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}